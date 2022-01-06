// This JS file should render on a webpage the BST with the following
// actions :
//  1- It generates a random element between -100 and 100, add it to
//     the tree, and make an animation to show that it is added. This
//     happen when the user click the 'space' button.
//  2- It deletes a node if the user clicks on the following node.
//
// An external library : d3 is used for the rendering and animation

import BinarySearchTree from "./bst.js";

let numbers = [25, 10];
let tree = new BinarySearchTree(15);
numbers.forEach((n) => tree.insert(n));

// Showing the tree with the root element when the page is loaded
window.addEventListener("load", () => visualize(tree));
// Listening for the pressing of the key 'space'
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === "Space") {
    d3.selectAll("svg").remove();
    tree.insert(randomNumber());
    visualize(tree); // rerendering after each insertion
  }
});

/**
 * This function shows the tree in the screen. It first creates svg,
 * then a tree (using d3.tree()) and a root (using d3.hierarchy)
 *
 * @param {BinarySearchTree} tree
 * @returns void
 */
const visualize = (tree) => {
  let svg = d3
    .select("body")
    .append("svg")
    .attr("height", "1000")
    .attr("width", "1000")
    .append("g")
    .attr("transform", "translate(0, 20)");

  let treemap = d3.tree().size([400, 400]);
  let root = d3.hierarchy(tree.root, (d) => {
    d.children = [];
    if (d.left) d.children.push(d.left);
    if (d.right) d.children.push(d.right);
    return d.children;
  });

  // Starting points of the tree (root)
  root.x0 = 400 / 2; // choosing the middle of the treemap
  root.y0 = 0; // choosing the top

  update({ root, treemap, svg });
};

const update = ({ root, treemap, svg }) => {
  let treeData = treemap(root); // lays out the root's hierarchy
  let nodes = treeData.descendants(); // array of descendant nodes
  let links = treeData.descendants().slice(1);
  let i = 0; // will serve as id for nodes

  nodes.forEach((d) => (d.y = d.depth * 100));

  let node = svg.selectAll("g.node").data(nodes, (d) => {
    if (!d.id) d.id = ++i;
  });

  // Adding a new node element as a 'g' element (with the onclick
  // function that removes it from the tree).
  let nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", () => "translate(" + root.x0 + "," + root.y0 + ")")
    .on("click", (node) => {
      tree.remove(node.value);
      d3.selectAll("svg").remove();
      visualize(tree);
    });

  // Adding a the circle (as required, the elements should be in a
  // circle).
  nodeEnter
    .append("circle")
    .attr("class", "node")
    .attr("r", (d) => d.value)
    .style("fill", "#fff")
    .style("stroke", "black");

  // Adding the text inside of the circle
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", ({ data: { value } }) => (String(value).length > 1 ? -7 : -3))
    .text(({ data }) => data.value)
    .style("cursor", "pointer")
    .style("font", "11px arial");

  // Updating the nodes

  let nodeUpdate = nodeEnter.merge(node);

  nodeUpdate
    .transition()
    .duration(750)
    .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

  nodeUpdate
    .select("circle.node")
    .attr("r", 10)
    .style("fill", (d) => (d._children ? "ligthsteelblue" : "#fff"))
    .attr("cursor", "pointer");

  // The links joining the nodes

  let link = svg.selectAll("path.link").data(links, (d) => d.id);
  let linkEnter = link
    .enter()
    .insert("path", "g")
    .style("fill", "none")
    .style("stroke", "gray")
    .attr("class", "link")
    .attr("d", () => {
      let o = { x: root.x0, y: root.y0 };
      return diagonal(o, o);
    });

  // Updating links

  let linkUpdate = linkEnter.merge(link);

  linkUpdate
    .transition()
    .duration(750)
    .attr("d", (d) => diagonal(d, d.parent));

  nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  function diagonal(s, d) {
    return `M ${s.x} ${s.y} C ${(s.x + d.x) / 2} ${s.y}, ${(s.x + d.x) / 2} ${d.y}, ${d.x} ${d.y}`;
  };
};


function randomNumber() {
    const [min, max] = [-100, 100];
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
};