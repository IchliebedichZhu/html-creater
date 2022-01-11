import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Row } from 'antd';
import './index.scss';
import DragView, { TabListData } from '@/component/dragView';
import ReactDOM from 'react-dom';
import { useMemo, useEffect, useState, useCallback } from 'react';

const MOVE_CHILD_ID = 'move_child';
let tmpNode: HTMLDivElement | undefined;

const menuList: DragMenuListData[] = [
  {
    key: 'form',
    name: 'form',
    icon: 'form',
    style: {
      background: '#fff',
      width: 300,
      height: 150,
    },
    element: (style) => <div style={style}>form</div>,
  },
];

const viewList: TabListData[] = [
  {
    key: 'view',
    name: 'View',
  },
  {
    key: 'code',
    name: 'Code',
  },
];

function handleMenuClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item?: DragMenuListData
) {
  const node = document.querySelector<HTMLDivElement>(`#${MOVE_CHILD_ID}`);
  if (node && item) {
    tmpNode = node;
    node.style.display = 'block';

    node.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
    ReactDOM.render(item.element(item.style || {}), node);
  }
}

function handleMouseMove(e: MouseEvent, node?: HTMLDivElement) {
  if (node) {
    let pageX = e.pageX,
      pageY = e.pageY;

    node.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
  }
}

function handleMouseUp(e: MouseEvent, node?: HTMLDivElement) {
  if (node) {
    ReactDOM.unmountComponentAtNode(node);
    tmpNode = undefined;
  }
}

function Main() {
  const [currentElement, setCurrentElement] = useState<DragMenuListData>();
  useEffect(() => {
    const tmpChild = document.createElement('div');
    tmpChild.id = MOVE_CHILD_ID;
    tmpChild.style.position = 'fixed';
    tmpChild.style.top = '0';
    tmpChild.style.left = '0';
    tmpChild.style.display = 'none';
    document.body.appendChild(tmpChild);
  }, []);
  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={6}>
          <DragMenu
            list={menuList}
            handleClick={(e, item) => {
              setCurrentElement(item);
              handleMenuClick(e, item);
            }}
            handleMove={(e) => handleMouseMove(e, tmpNode)}
            handleEnd={(e) => handleMouseUp(e, tmpNode)}
          />
        </Col>
        <Col className='draw_view_main' span={12}>
          <DragView tabMenu={viewList} />
        </Col>
        <Col span={6}>
          <DragAttribute />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
