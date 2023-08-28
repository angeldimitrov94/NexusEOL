<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/angeldimitrov94/NexusEOL">
    <img src="images/nexuseol.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Nexus EOL Manufacturing Test Data Aggregator</h3>

  <p align="center">
    nexus - noun - nex·​us ˈnek-səs : CONNECTION, LINK<br/>
    EOL = end-of-line, describes the final manufacturing test performed on an assembled manufactured product at the end of the assembly line<br/>
    An aggregator and central connection hub for manufacturing test data (hence 'Nexus'). When a product is tested by a manufacturer, said test status and data is sent to the platform. Pushes of data to the platform can trigger subsequent logic, such as back-office operations.<br />
    <a href="https://github.com/angeldimitrov94/NexusEOL/issues">Report Bug</a>
    ·
    <a href="https://github.com/angeldimitrov94/NexusEOL/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Manufacturing processes sometimes suffer from being woefully disconnected. The amount of data available can offer tremendous value, IF it is captured. The platform is specifically tailored to make it easy for manufacturing testing teams to send their data to a centralized location where various stake-holders can access it from the web, as opposed to various random bits of data being stored away on scattered machines across multiple networks and with varying formats.</br>
</br>
Manufacturing software teams can suffer from being under-resourced and over-tasked. Especially with teams focused on testing assembly integrity of high-complexity electro-mechanical assemblies, the team is spread thin between understanding and characterizing the mechanical and electrical characteristics of the product, and managing the business requirements placed on them by management. This conflict causes internally-designed tools to be fragile, inflexible and dated...</br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Node.Js][Node.Js]][Node.Js-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Vue.Js][Vue.Js]][Vue-url]
* [![Bootstrap][Bootstrap]][Bootstrap-url]
* [![ExpressJS][ExpressJS]][ExpressJS-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![JsonWebTokens][JsonWebTokens]][JsonWebTokens-url]
* [![Jest][Jest]][Jest-url]
* [![Docker][Docker]][Docker-url]
* [Axios](Axios-url)
* [Dotenv](dotenv-url)
* [cookie-parser](cookie-parser-url)
* [Vue Router](vue-router-url)
* [Mongoose](mongoose-url)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project runs in a containerized fashion using Docker. Ensure that your machine has adequate resources to run the workload. Suggested minimum development machine specs : 4GB RAM, 2 CPU cores, 5GB storage. To get a local copy up and running follow these simple example steps.

### Prerequisites

Docker is the only requirement on the machine, in order to get started. See [Docker website](https://docs.docker.com/get-docker/) for details on getting Docker installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/angeldimitrov94/NexusEOL.git
   ```
2. Ensure that Docker is running and ready to spin up containers
3. Create .env files in each of the sub-projects' folders, and add the following variables, in the following format:
   ```sh
   JWT_KEY=<randomized string used to generate JWTs - longer string will be tougher to crack, in theory>
   MONGO_URI=<the URI that points to the mongodb container...example : mongodb://mongodb:27017/accounts>
   DEV=<0 to run with dev features, 1 to run with dev features>
   ```
4. Modify client>nginx.conf or client>nginx.dev.conf (depending on dev/prod environment) to point to the correct server address and port.

5. Add the .crt and .key files for your machine to each projects' /ssl directory, that NGINX will use for TLS encryption. See [NGINX documentation](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-tcp/) for details on how to generate these files.

6. Run the Docker-compose file to have Docker build the images and spin up the containers.

   To spin up dev environment:
   ```sh
   docker-compose -f docker-compose-dev.yaml up
   ```
   To spin up production environment:
   ```sh
   docker-compose -f docker-compose-prod.yaml up
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Further automate deployment process (creation of env files, etc.)
- [ ] Add MongoDB authentication by default

See the [open issues](https://github.com/angeldimitrov94/NexusEOL/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Angel Dimitrov - angeldimitrov94@gmail.com

Project Link: [https://github.com/angeldimitrov94/NexusEOL](https://github.com/angeldimitrov94/NexusEOL)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/angeldimitrov94/NexusEOL.svg?style=for-the-badge
[contributors-url]: https://github.com/angeldimitrov94/NexusEOL/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/angeldimitrov94/NexusEOL.svg?style=for-the-badge
[forks-url]: https://github.com/angeldimitrov94/NexusEOL/network/members
[stars-shield]: https://img.shields.io/github/stars/angeldimitrov94/NexusEOL.svg?style=for-the-badge
[stars-url]: https://github.com/angeldimitrov94/NexusEOL/stargazers
[issues-shield]: https://img.shields.io/github/issues/angeldimitrov94/NexusEOL.svg?style=for-the-badge
[issues-url]: https://github.com/angeldimitrov94/NexusEOL/issues
[license-shield]: https://img.shields.io/github/license/angeldimitrov94/NexusEOL.svg?style=for-the-badge
[license-url]: https://github.com/angeldimitrov94/NexusEOL/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin.com/in/angel-dimitrov
[product-screenshot]: images/screenshot.png
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Node.Js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node.Js-url]: https://nodejs.dev/en/
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Bootstrap]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[ExpressJS]: 	https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[ExpressJS-url]: https://expressjs.com/
[MongoDB]: 	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[JsonWebTokens]: 	https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[JsonWebTokens-url]: https://jwt.io/
[Jest]: 	https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Docker]: 	https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[cookie-parser-url]: https://www.npmjs.com/package/cookie-parser
[vue-router-url]: https://router.vuejs.org/
[mongoose-url]: https://mongoosejs.com/