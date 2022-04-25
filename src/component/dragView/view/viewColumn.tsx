import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData } from '@/component/dragMenu';
import { useCallback } from 'react';
import { handleViewItemFunc } from '.';

type ViewColumnParam = {
  isPreView: boolean;
  focusIndex: number;
  index: number;
  val: DragMenuListData;
  handleClick: handleViewItemFunc;
};

/** 解析属性 */
function explainAttribute(
  attrList: AttributeFormList[] = []
): Record<string, any> {
  let obj: Record<string, any> = {};
  attrList.forEach((val) => {
    obj[val.key] = val.value;
  });
  return obj;
}

/** 视图列 */
function ViewColumn({
  isPreView,
  focusIndex,
  index,
  val,
  handleClick,
}: ViewColumnParam) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isPreView) {
        return;
      }
      e.preventDefault();
      handleClick(e, val, index);
    },
    [val, index]
  );
  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isPreView) {
        return;
      }
      e.preventDefault();
    },
    []
  );
  return (
    <div
      className={focusIndex === index ? 'screen_view_focus' : ''}
      key={`${val.key}_${index}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {val.element(
        val.style || [],
        explainAttribute(val.attributes),
        val.customStyle
      )}
    </div>
  );
}

export default ViewColumn;
