///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 16:18
///

import { makeUClass} from 'puerts'
import {MeasureViewModel} from "./MeasureViewModel";
import {MeasureDistanceModel} from "../Model/MeasureDistanceModel";
import {MeasureDistanceView} from "../View/MeasureDistanceView";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class MeasureDistanceViewModel extends MeasureViewModel  {
    constructor() {
        super()
        this.BaseModel = new MeasureDistanceModel()
        this._OBJClass = makeUClass(MeasureDistanceView)
        this.Type = "MeasureDistance"
        MeasureViewModel.RegisterViewModel(this)
        this.Birthplace = "Scene"
        MessageCenter.Add(this, this.RefreshData, NotificationLists.API.Drawn_Measure_Coodinate)
    }

    RefreshData(data) {
        if (data.id == null || data.id == "")
            return "id key no have"
        let baseData = this.BaseModel.GetData(data.id)
        if (baseData !== null) {
            this.BaseModel.RefreshData(data.id, data)
            this.UpdateAPINode(this.GetType(),data.id,data)
        }
        return "success"
    }
}