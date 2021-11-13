import { NodeJsonDBAdapter } from './Adapter';
import { EndPoint, EndPointsTypesString } from './EndPoint';
import { Json, JsonArray } from './json.types';
import { IStoreDBAdapter, IEndPoint, ICreateTypesInStore } from './store.types';

export class Store<T> {
  public readonly adapter: IStoreDBAdapter;

  constructor(
    public readonly fileName?: string,
    public readonly Adapter = NodeJsonDBAdapter,
  ) {
    this.adapter = new Adapter(fileName);
  }

  private createEndPoints() {
    const context = this;

    const EP = <Type>(map: Function) => {
      return <IEndPoint<Type>> <unknown> this.EP.call(context, map);
    };

    function EPR<TYPE = string>(type: 'string', map: Function): IEndPoint<TYPE>
    function EPR<TYPE = number>(type: 'number', map: Function): IEndPoint<TYPE>
    function EPR<TYPE = boolean>(type: 'boolean', map: Function): IEndPoint<TYPE>
    function EPR<TYPE = Json>(type: 'Json', map: Function): IEndPoint<TYPE>
    function EPR<TYPE = JsonArray>(type: 'JsonArray', map: Function): IEndPoint<TYPE>
    function EPR(type: EndPointsTypesString, map: Function): IEndPoint {
      return context.EPR.call(context, type, map);
    }

    return {
      EP, EPR,
    };
  }


  private EP(map: Function) {
    return new EndPoint(this.adapter, map);
  }

  private EPR(type: EndPointsTypesString, map: Function): IEndPoint {
    const types = ['string', 'number', 'boolean', 'Json', 'JsonArray'];
    if (types.includes(type)) {
      return new EndPoint(this.adapter, map, type);
    }
    throw new Error(`${type} - Is not correct type. Expected one of ${types}`);
  }

  private useV2(storeInstanceCreatedEndPoints: any) {
    const epkey = '__500IQ_ALIAS_TO_ENDPOINT__';
    const eprkey = '__500IQ_ALIAS_TO_ENDPOINT_RUNTIME__';
    const EP_odl = storeInstanceCreatedEndPoints.EP;
    const EPR_old = storeInstanceCreatedEndPoints.EPR;
    let EP: <T>() => T;
    let EPR: <B extends EndPointsTypesString,
      T = B extends 'string' ? string
        : B extends 'number' ? number
          : B extends 'boolean' ? boolean
            : B extends 'Json' ? Json
              : B extends 'JsonArray' ? JsonArray
                : never> (type: B) => T;
    //@ts-ignore
    EP = () => epkey;
    //@ts-ignore
    EPR = (type) => [eprkey, type];
    //@ts-ignore
    const createStore = <T>(schema: T): ICreateTypesInStore<T, 'STORE'> => keyofGlist(schema);

    return {
      createStore, EP, EPR,
    };

    // Craeet new obj width replaced EndPoint key to normal endPoint
    function keyofGlist(object1: any) {
      let newObject = Object.assign(EP_odl('/'), object1);
      getKeyByValue(newObject, object1);
      return newObject;

      function getKeyByValue(newObject: any, obj1: any, h: any = '') {

        return Object.keys(obj1).find(key => {
          const strHistory = h + '.' + key;
          if (obj1[key] === epkey) newObject[key] = EP_odl(strHistory);
          else if (obj1[key][0] === eprkey) {
            newObject[key] = EPR_old(obj1[key][1], strHistory);
          } else if (obj1[key] && typeof obj1[key] === 'object') {
            newObject[key] = Object.assign(EP_odl(strHistory), obj1[key]);
            getKeyByValue(newObject[key], obj1[key], strHistory);
          }
        });
      }
    }
  }

  public endPointSystem() {
    const endPoints = this.createEndPoints();
    return this.useV2(endPoints);
  }
}
