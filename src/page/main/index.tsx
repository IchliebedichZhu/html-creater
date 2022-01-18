import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Row } from 'antd';
import './index.scss';
import DragView, { TabListData, viewContainerId } from '@/component/dragView';
import { useEffect, useMemo, useState } from 'react';
import {
  checkIsInContainer,
  handleMenuClick,
  handleMouseMove,
  handleMouseUp,
  InitTempBox,
} from './methods';
import { useMouseMove, useMouseUp } from '@/hooks/mouseEvent';
import { deepClone } from '@/utils';
import { ViewListPositionData } from '@/component/dragView/view';

let currentIndex = -1;
let currentElement: DragMenuListData;
let containViewList: DragMenuListData[] = [];
let containerPosition: ViewListPositionData[] = [];
let isSetting = false;
let isInsert = false;

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
      const insertIndex = handleMouseMove(e, containerPosition);
      console.log(currentIndex, insertIndex, isInsert, isSetting);
      if (isSetting) return;
      if (!checkIsInContainer(e, viewContainerId)) return;

      if (insertIndex != undefined && insertIndex >= 0) {
        const oldElement = containViewList[insertIndex];
        console.log(oldElement);
        if (currentIndex === insertIndex && !isInsert) return;
        else if (currentIndex !== -1) {
          containViewList.splice(currentIndex, 1);
        }

        containViewList.splice(
          insertIndex,
          1,
          deepClone(currentElement),
          oldElement
        );

        currentIndex = insertIndex;
        setViewList([...containViewList]);
        isInsert = false;
      } else if (containViewList.length === 0) {
        if (currentElement) {
          containViewList.push(deepClone(currentElement));
          setViewList([...containViewList]);
          isSetting = true;
          currentIndex = 0;
        }
      }
    });
    useMouseUp((e) => {
      handleMouseUp();
      isInsert = false;
      isSetting = false;
      // currentIndex = -1;
      // if (isInsert && currentElement && currentIndex === -1) {
      //   containViewList.push({ ...currentElement });
      //   setViewList([...containViewList]);
      // }
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
              isInsert = true;
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
                containerPosition = positionList;
                positionList.forEach((val, index) => {
                  containViewList[index].position = val;
                });
              }
              if (positionList.length > 1) {
                isSetting = false;
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
