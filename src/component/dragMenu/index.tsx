import React, { ReactNode, useEffect } from 'react';
import Icon from '@/component/icon';
import './index.scss';

type MenuClickFunc = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

type MoveFunc = (e: MouseEvent) => void;

type DragMenuParam = {
  title?: string;
  list: DragMenuListData[];
  handleClick?: MenuClickFunc;
  handleMove?: MoveFunc;
  handleEnd?: MoveFunc;
  currentIndex?: number;
};

type DragMenuListParam = {
  list: DragMenuListData[];
  handleClick: MenuClickFunc;
  currentIndex?: number;
};

/** 菜单栏列表数据 */
export type DragMenuListData = {
  key: string;
  name: string;
  icon: string | ReactNode;
  element: (style: React.CSSProperties) => React.FunctionComponentElement<any>;
  style?: React.CSSProperties;
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
  title = 'Menu List',
  list,
  handleClick = () => {},
  handleMove = () => {},
  handleEnd = () => {},
  currentIndex = -1,
}: DragMenuParam) {
  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      e.preventDefault();
      handleMove(e);
    });
    window.addEventListener('mouseup', (e) => {
      e.preventDefault();
      handleEnd(e);
    });
  }, []);
  return (
    <section className='drag_menu'>
      <h3 className='drag_menu_title'>{title}</h3>
      <div className='drag_menu_list'>
        {/* <DragComponent> */}
        <MenuList
          list={list}
          handleClick={handleClick}
          currentIndex={currentIndex}
        />
        {/* </DragComponent> */}
      </div>
    </section>
  );
}

export default DragMenu;
