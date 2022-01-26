import { customStyleData } from '@/component/dragAttribute/attributeStyle';
import { styleData } from '@/component/dragMenu';

export type elementFunc = (
  style: styleData[],
  attributes?: Record<string, any> | undefined,
  customStyle?: customStyleData[]
) => React.FunctionComponentElement<any>;
