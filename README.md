# Alloys Dashboard

This repository stores a full stack web application built with [React](https://react.dev/) (frontend) and [.NET Web REST API](https://dotnet.microsoft.com/en-us/apps/aspnet/apis) (backend). 

It provides a graphical user interface for data visualization, powered by a .NET Web REST API.


https://github.com/user-attachments/assets/49dfaa9a-9fa9-4820-89c7-85fa577cfbb1


## Table of Contents

- [Requirements](#requirements)
- [Docs](#docs)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Author](#author)

<a name="requirements"></a>
## 📋 Requirements

- **.NET SDK:**  
  - Version: **10.0.102**
  - Download: [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download)

> **ℹ️ Please make sure to use a Long Term Support (LTS) version of .NET.**  
> LTS releases (even-numbered versions like .NET 6/8/10) receive security updates and support for three years, making them the recommended choice for production projects.
>
> Always keep your .NET SDK up to date.  
> You can check the latest supported LTS versions and their end-of-life dates at [https://versionsof.net/](https://versionsof.net/).

- **Node.js**  
  - Version: **23.9.0**
  - Download: [https://dotnet.microsoft.com/en-us/download](https://www.microsoft.com/fr-fr/sql-server/sql-server-downloads)

<a name="docs"></a>
## 📚 Docs
Technical documentation (UML diagrams) is available in the `docs` folder. All diagrams are created using [Mermaid](https://mermaid.js.org/), which ensures traceability and facilitates maintainability.

<a name="project-structure"></a>
## 🗂️ Project structure
```
├───docs
├───backend
│   ├───AlloysDashboard.API
│   │   ├───Controllers
│   ├───AlloysDashboard.Application
│   │   ├───DTOs
│   │   ├───Interfaces
│   │   └───UseCases
│   ├───AlloysDashboard.Domain
│   │   ├───Models
│   └───AlloysDashboard.Infrastructure
│      ├───Database
│      └───Repositories
└───frontend
    ├───public
    └───src
        ├───assets
        ├───types
        └───components

```

<a name="usage"></a>
## 🚀 Usage (DEV)

#### Start the backend

```
cd .\backend\
dotnet run
```

#### Start the frontend

```
cd .\frontend\
npm run dev
```

<a name="testing"></a>
## 🔬 Testing

<a name="deployment"></a>
## 🚢 Deployment

<a name="author"></a>
## 👥 Author

- Alexandre Arle – [@arlealexandre](https://github.com/arlealexandre)
