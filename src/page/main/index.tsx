import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Row } from 'antd';
import './index.scss';
import DragView, { TabListData, viewContainerId } from '@/component/dragView';
import { useEffect, useMemo, useState } from 'react';
import {
  handleMenuClick,
  handleMouseMove,
  handleMouseUp,
  InitTempBox,
} from './methods';
import { useMouseMove, useMouseUp } from '@/hooks/mouseEvent';

let currentIndex = -1;
let currentElement: DragMenuListData;
let containViewList: DragMenuListData[] = [];

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
  {
    key: 'box',
    name: 'box',
    icon: 'form',
    style: {
      background: '#fff',
      width: 300,
      height: 150,
    },
    element: (style) => <div style={style}>box</div>,
  },
];
const tabList: TabListData[] = [
  {
    key: viewContainerId,
    name: 'View',
  },
  {
    key: 'code',
    name: 'Code',
  },
];

function Main() {
  let [viewList, setViewList] = useState<DragMenuListData[]>([]);
  useEffect(() => {
    InitTempBox();
    useMouseMove((e) => {
      const insertIndex = handleMouseMove(e, containViewList);
      console.log(insertIndex);

      if (insertIndex && insertIndex >= 0) {
        const tmp = containViewList[insertIndex];
        containViewList.splice(insertIndex, 1, currentElement, tmp);
        currentIndex = insertIndex;
        setViewList([...containViewList]);
      } else {
        currentIndex = -1;
      }
    });
    useMouseUp((e) => {
      const isInsert = handleMouseUp(e, viewContainerId);
      if (isInsert && currentElement && currentIndex === -1) {
        containViewList.push(currentElement);
        setViewList([...containViewList]);
      }
    });
  }, []);
  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={6}>
          <DragMenu
            list={menuList}
            handleClick={(e, item) => {
              currentElement = item;
              handleMenuClick(e, item);
            }}
          />
        </Col>
        <Col className='draw_view_main' span={12}>
          <DragView
            tabMenu={tabList}
            viewList={viewList}
            handleClick={(e, item, index) => {
              currentElement = item;
              handleMenuClick(e, item);
              containViewList.splice(index, 1);
              setViewList([...containViewList]);
            }}
            handleViewChange={(positionList) => {
              if (positionList && positionList.length) {
                positionList.reverse().forEach((val, index) => {
                  containViewList[index].position = val;
                });
              }
              setViewList(containViewList);
            }}
          />
        </Col>
        <Col span={6}>
          <DragAttribute />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
