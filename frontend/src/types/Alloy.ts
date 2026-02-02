import type { AlloyProperties } from "./AlloyProperties"
import type { Composition } from "./Composition"

export interface Alloy {
    name: number
    properties: AlloyProperties
    compositions: Composition[]
}