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

      const graph = script.getAttribute('data-graph');
      const dataOptions = script.getAttribute('data-options');
      const options = dataOptions ? JSON.parse(dataOptions) : undefined;
      if (graph) {
        viz.renderSVGElement(graph, options).then(element => {
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
        div.textContent = 'inviz: data-graph attribute not found on script element, e.g. data-graph="digraph { a -> b }"';
        throw new Error(div.textContent);
      }

      script.remove();
    });
  });
};
