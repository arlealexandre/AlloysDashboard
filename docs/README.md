# Alloys Dashboard - Docs

## Context diagram

```mermaid
graph RL

    %% System actors
    User(("👤<br>User")):::actor

    %% System - Use case container
    subgraph System["Alloys Dashboard"]
    end

    %% Interactions
    User -- Requests --> System
    System -- Data --> User

    %% Style
    classDef actor stroke:none,fill:none,font-size:20px
```

## Use Case diagram

```mermaid
graph LR

    %% System actors
    User(("👤<br>User")):::actor

    %% System - Use case container
    subgraph "Alloys Dashboard"

        space[ ]:::hide

        UC1([List filtered alloys])

        UC_FILTER([Filter alloys])
        UC_COMP([Visualize compositions])

        UC_COMP -. "<span><< Extend >></span>" .-> UC1
        UC1 -. "<span><< Include >></span>" .-> UC_FILTER
    end

    %% Relationship
    User ---> UC1


    %% Style
    classDef hide display:none;
    classDef actor stroke:none,fill:none,font-size:20px
```

## High-level view

```mermaid
graph LR

    %% System actors
    User(("👤<br>User")):::actor

    %% System - Use case container
    subgraph "Alloys Dashboard"
        
        %% Internal components
        NEXT["<b>SPA</b><br/>(Next.js)"]
        API["<b>REST API</b><br/>(Python FastAPI)"]
        Database[("<b>Database</b><br/>(MSSQL)")]
        
        %% Internal dataflow
        API -- "SQL" --> Database
    end

    %% Interactions
    User -- "UI interactions" --> NEXT
    NEXT -- "HTTPS Request" --> API
    API -- "HTTPS Response (JSON)" --> NEXT
    NEXT --> User

    %% Style
    classDef actor stroke:none,fill:none,font-size:20px
```

## Detailed view - SPA (Next.js)

## Detailed view - REST API (Python FastAPI)

## Class diagram

```mermaid
classDiagram

    class Alloy {
        + int name
    }

    class ChemicalElement {
        + str symbol
    }

    class Composition {
        + float nominal
        + float min
        + float max
    }

    class Properties {
        + float product_thickness
        + str product_type
        + str product_shape
        + float l_direction_tys
        + float aging_step_1_temp
        + float aging_step_1_time
        + float homo_step_1_temp
        + float homo_step_1_time
        + float hot_process_step_1_t_in
        + str casting_technology
    }

    Alloy "1" -- "1..*" Composition : composed_by
    Composition "0..*" -- "1" ChemicalElement : has_element
    Alloy "1" -- "1" Properties : has_properties
```

## Dynamic view
