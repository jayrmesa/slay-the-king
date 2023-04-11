import Sketch from "react-p5";
import path from 'ngraph.path';
import createGraph from 'ngraph.graph';
import Delaunator from 'delaunator';

const MapGen = () => {
  let canvasSize;
  let startPoint;
  let endPoint;
  const PoissonDiskSampling = window.PoissonDiskSampling
  let graph = createGraph();

  function setup(p5, parentRef) {
    canvasSize = p5.min(900, window.innerWidth);
    p5.createCanvas(900, 900).parent(parentRef);
    p5.colorMode(p5.HSB);
    p5.noLoop();

    // Poisson Disk Sampling
    let pdsObj = new PoissonDiskSampling({
      shape: [canvasSize * 0.9, canvasSize * 0.9],
      minDistance: 240,
      maxDistance: 240,
      tries: 10,
    });
    startPoint = [canvasSize * 0.45, canvasSize * 0.9];
    endPoint = [canvasSize * 0.45, 0];
    pdsObj.addPoint(startPoint);
    pdsObj.addPoint(endPoint);
    let points = pdsObj.fill().filter((p) => {
      return (
        p5.dist(...p, canvasSize * 0.45, canvasSize * 0.45) <= canvasSize * 0.45
      );
    }, p5.random);

    // Delaunay
    let delaunay = Delaunator.from(points).triangles;
    let triangles = [];
    for (let i = 0; i < delaunay.length; i += 3) {
      triangles.push([
        points[delaunay[i]],
        points[delaunay[i + 1]],
        points[delaunay[i + 2]],
      ]);
    }
    for (let t of triangles) {
      graph.addLink(t[0], t[1], {
        weight: p5.dist(...t[0], ...t[1]),
      });
      graph.addLink(t[1], t[2], {
        weight: p5.dist(...t[1], ...t[2]),
      });
      graph.addLink(t[2], t[0], {
        weight: p5.dist(...t[2], ...t[0]),
      });
    }
  }

  function draw(p5) {
    
    p5.noStroke();
    p5.fill(40, 50, 60, 0,);
    p5.rect(0, 0, canvasSize, canvasSize);
    p5.push();
    p5.strokeWeight(10);
    p5.stroke(40, 80, 20, 0);
    p5.fill(0, 0);
    p5.square(0, 0, canvasSize);
    p5.pop();

    p5.push();
    p5.translate(canvasSize * 0.05, canvasSize * 0.05);
    // Lines
    let activePoints = [];
    for (let i = 0; i < canvasSize / 50; i++) {
      const pathFinder = path.aStar(graph, {
        distance(fromNode, toNode, link) {
          return link.data.weight;
        },
      });
      const foundPath = pathFinder.find(startPoint, endPoint);
      if (foundPath.length === 0) {
        break;
      }
      activePoints.push(...foundPath.map((obj) => obj.id));

      p5.stroke(40, 80, 20);
      p5.fill(40, 80, 20, 0);
      for (let j = 1; j < foundPath.length; j++) {
        arrow(p5, ...foundPath[j].id, ...foundPath[j - 1].id);
      }

      const idx = p5.floor(p5.random(1, foundPath.length - 1));
      graph.removeNode(foundPath[idx].id);
    }

    // Points
    p5.stroke(0);
    p5.textSize(52);
    p5.textAlign(p5.CENTER, p5.CENTER);
    for (const p of new Set(activePoints)) {
      const pJSON = JSON.stringify(p);
      switch (pJSON) {
        case JSON.stringify(startPoint):
          p5.text("😀", ...p);
          break;
        case JSON.stringify(endPoint):
          p5.text("😈", ...p);
          break;
        default:
          p5.text(p5.random(Array.from("💀💀💀💰❓")), ...p);
      }
    }
    p5.pop();

    p5.noStroke();
    p5.fill(40, 50, 60, 0);
    p5.rect(0, 0, canvasSize, canvasSize);
  }

  function arrow(p5, x1, y1, x2, y2, arrowSize = 6) {
    let vec = p5.createVector(x2 - x1, y2 - y1);
    const len = vec.mag();
    vec.mult((len - 10) / len);
    p5.push();
    p5.translate(x1, y1);
    dottedLine(p5, 0, 0, vec.x, vec.y);
    p5.rotate(vec.heading());
    p5.translate(vec.mag() - arrowSize, 0);
    p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p5.pop();
  }

  function dottedLine(p5, x1, y1, x2, y2, fragment = 5) {
    let vec = p5.createVector(x2 - x1, y2 - y1);
    const len = vec.mag();
    p5.push();
    p5.translate(x1, y1);
    p5.stroke(255);
    for (let i = p5.floor((len * 0.5) / fragment); i >= 0; i--) {
      if (i === 0 && p5.floor(len / fragment) % 2 === 0) {
        vec.normalize().mult(len % fragment);
      } else {
        vec.normalize().mult(fragment);
      }
      p5.line(0, 0, vec.x, vec.y);
      vec.mult(2);
      p5.translate(vec.x, vec.y);
    }
    p5.pop();
  }

  return (
      <Sketch setup={setup} draw={draw} />
  );

};

export default MapGen;