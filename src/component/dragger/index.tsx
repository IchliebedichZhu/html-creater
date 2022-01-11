type DragParams = {
  children?: React.ReactChild;
};

function DragComponent(data: DragParams) {
  return <section draggable>{data.children}</section>;
}

export default DragComponent;
