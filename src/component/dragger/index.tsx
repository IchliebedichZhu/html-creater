type DragParams = {
  children?: React.ReactChild;
};

function DragComponent(data: DragParams) {
  return (
    <section
      draggable
      onDrag={(e) => {
        console.log(e);
      }}
    >
      {data.children}
    </section>
  );
}

export default DragComponent;
