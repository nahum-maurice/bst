// This JS file should render on a webpage the BST with the following
// actions :
//  1- It generates a random element between -100 and 100, add it to
//     the tree, and make an animation to show that it is added. This
//     happen when the user click the 'space' button.
//  2- It deletes a node if the user clicks on the following node.
//
// An external library : d3 is used for the rendering and animation

import BinarySearchTree from "./bst";

let tree = new BinarySearchTree(randomNumber());

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
      if (d.rigth) d.children.push(d.right);
      return d.children;
  })

  // Starting points of the tree (root)
  root.x0 = 400/2 // choosing the middle of the treemap
  root.y0 = 0 // choosing the top

  // I should now create an update function... 
  // In the next 45 minutes
};

const randomNumber = () => {
  const [min, max] = [-100, 100];
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};
