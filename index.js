// MIT Licensed by Trevor Sundberg
import Viz from 'viz.js';

export default async workerRelativeURL => {
  const script = document.currentScript;

  // Generate a div with a temporary id so we can look it up
  const tempId = 'd' + Math.random();
  document.write(`<div id="${tempId}"></div>`);
  const div = document.getElementById(tempId);
  div.removeAttribute('id');

  // Copy all attributes from the script element onto ours
  for (let i = 0; i < script.attributes.length; ++i) {
    const attr = script.attributes[i];
    if (attr.specified && attr.name !== 'src') {
      div.setAttribute(attr.name, attr.value);
    }
  }

  function isIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  const url = new URL(window.location.href);
  function parameter(name) {
    if (!isIframe()) {
      return script.getAttribute(`data-${name}`);
    }
    return url.searchParams.get(`inviz-${name}`) || script.getAttribute(`data-${name}`);
  }


  const scriptURL = new URL(script.src, window.location.href).href;
  const workerURL = new URL(workerRelativeURL, scriptURL).href;
  const workerFetch = fetch(workerURL);

  const dataGraphUrl = parameter('graph-url');
  const dataGraph = dataGraphUrl ? await (await fetch(dataGraphUrl)).text() : parameter('graph');

  const workerResponse = await workerFetch;
  const workerText = await workerResponse.text();

  const objectURL = URL.createObjectURL(new Blob([workerText]));
  const viz = new Viz({
    workerURL: objectURL
  });

  const dataOptions = parameter('options');
  const options = dataOptions ? JSON.parse(dataOptions) : undefined;
  if (dataGraph) {
    viz.renderSVGElement(dataGraph, options).then(element => {
      div.appendChild(element);
      const toSend = new Event('graphload');
      toSend.div = div;
      toSend.svg = element;
      div.dispatchEvent(toSend);
    }).catch(err => {
      div.textContent = `inviz: ${err && err.message || err}`;
      throw err;
    });
  } else {
    div.textContent = 'inviz: Must use ?inviz-graph=... in the url or add the data-graph="..." attribute to the script element';
    throw new Error(div.textContent);
  }

  script.remove();
};
