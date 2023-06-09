export interface IEntity{
    id: number;
    parentId: number;
    name: string;
}
type BaseResponse = {
    list0: IEntity[];
    list1: IEntity[];
};
export interface IResponse{
    data: BaseResponse;
}