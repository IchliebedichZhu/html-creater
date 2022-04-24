import React, { ReactNode, useEffect } from 'react';
import Icon from '@/component/icon';
import './index.scss';
import { ViewListPositionData } from '../dragView/view';
import { AttributeFormList } from '../dragAttribute/attributeForm';
import { customStyleData } from '../dragAttribute/attributeStyle';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

type MenuClickFunc = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

export type DragMenuPanelData = {
  key: string;
  title: string;
  list: DragMenuListData[];
};

type DragMenuParam = {
  list: DragMenuPanelData[];
  handleClick?: MenuClickFunc;
  currentIndex?: number;
};

type DragMenuListParam = {
  list: DragMenuListData[];
  handleClick: MenuClickFunc;
  currentIndex?: number;
};

export type styleData = {
  key: keyof React.CSSProperties;
  value: string | number;
  title: string;
  type: 'input' | 'color' | 'swipe' | 'image' | 'precent';
};

export type DragMenuElementFunc = (
  style: styleData[],
  attributes?: Record<string, any>,
  customStyle?: customStyleData[]
) => React.FunctionComponentElement<any>;

/** 菜单栏列表数据 */
export type DragMenuListData = {
  key: string;
  name: string;
  icon: string | ReactNode;
  element: DragMenuElementFunc;
  style?: styleData[];
  customStyle?: customStyleData[];
  position?: ViewListPositionData;
  attributes?: AttributeFormList[];
};

function MenuList({ list, handleClick, currentIndex }: DragMenuListParam) {
  return (
    <>
      {list.map((val, index) => {
        const columnClass =
          currentIndex === index
            ? 'drag_menu_list_column drag_menu_list_column_active'
            : 'drag_menu_list_column';
        return (
          <div
            className={columnClass}
            key={val.key}
            onMouseDown={(e) => handleClick(e, val, index)}
          >
            {typeof val.icon === 'string' ? <Icon type={val.icon} /> : val.icon}
            <p>{val.name}</p>
          </div>
        );
      })}
    </>
  );
}

/** 菜单栏 */
function DragMenu({
  list,
  handleClick = () => {},
  currentIndex = -1,
}: DragMenuParam) {
  return (
    <Collapse defaultActiveKey={[list.length ? list[0].key : '']} ghost>
      {list.map((item) => (
        <Panel key={item.key} header={item.title}>
          <section className='drag_menu'>
            <div className='drag_menu_list'>
              <MenuList
                list={item.list}
                handleClick={handleClick}
                currentIndex={currentIndex}
              />
            </div>
          </section>
        </Panel>
      ))}
    </Collapse>
  );
}

export default DragMenu;
