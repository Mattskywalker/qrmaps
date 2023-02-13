import { SimpleLocation } from "../context/MapDataProvider";

export type navigate = (destiny: string, params: Params) => void

export type Params = {location: SimpleLocation}

export type DefaulParams = {params: {location: SimpleLocation}}