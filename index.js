// MIT Licensed by Trevor Sundberg
import Viz from 'viz.js';

export default workerRelativeURL => {
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

  const scriptURL = new URL(script.src, window.location.href).href;
  const workerURL = new URL(workerRelativeURL, scriptURL).href;
  fetch(workerURL).then(response => {
    response.text().then(text => {
      const objectURL = URL.createObjectURL(new Blob([text]));
      const viz = new Viz({
        workerURL: objectURL
      });

      const url = new URL(window.location.href);
      const dataGraph = url.searchParams.get('graph') || script.getAttribute('data-graph');
      const dataOptions = url.searchParams.get('options') || script.getAttribute('data-options');
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
        div.textContent = 'inviz: Must use ?graph=... in the url or add data-graph="..." ' +
          'attribute to the script element, e.g. data-graph="digraph { a -> b }"';
        throw new Error(div.textContent);
      }

      script.remove();
    });
  });
};
