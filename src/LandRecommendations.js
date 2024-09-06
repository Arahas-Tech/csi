import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const LandRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationLand = () => {
    return (
      <>
        <ul>
          <ul>
            <li className="text-xs">
              Prioritize high-density, mixed-use development to maximize space
              efficiency and reduce urban sprawl. Encourage vertical expansion
              over horizontal to conserve land.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Identify underutilized or vacant lands within the existing urban
              fabric for redevelopment, including brownfield sites, abandoned
              structures, and underdeveloped areas. Promote infill development
              to optimize land use.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Protect existing green spaces from encroachment and degradation.
              Develop new green zones in areas with low tree cover or those
              identified as urban heat islands.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Designate specific zones for urban afforestation and reforestation
              efforts. Encourage the creation of green roofs, community gardens,
              and vertical gardens in both residential and commercial areas.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Protect prime agricultural land from conversion to
              non-agricultural uses. Promote sustainable agricultural practices
              and agroforestry.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Develop policies to prevent urban encroachment into agricultural
              zones. Support small-scale urban farming initiatives and
              community-supported agriculture (CSA).
            </li>
          </ul>{" "}
          <li className="text-sm font-bold">Sustainable Urban Expansion:</li>
          <ul>
            <li className="text-xs">
              Direct new development towards designated growth corridors and
              areas that have existing infrastructure to support it. Avoid
              expansion into ecologically sensitive areas such as wetlands,
              forests, and agricultural zones.
            </li>
          </ul>{" "}
          <li className="text-sm font-bold"> Smart Zoning Policies:</li>
          <ul>
            <li className="text-xs">
              Use smart zoning to create mixed-use neighborhoods that combine
              residential, commercial, and recreational spaces, reducing the
              need for long commutes and improving quality of life.
            </li>
          </ul>{" "}
          <li className="text-sm font-bold">Urban Renewal Projects:</li>
          <ul>
            <li className="text-xs">
              Prioritize the redevelopment of dilapidated or underutilized
              areas. Encourage private-public partnerships (PPP) for urban
              renewal initiatives to revitalize older parts of the city.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-xs">
              Use Geographic Information Systems (GIS) and other data analytics
              tools to monitor land use patterns, assess environmental impact,
              and make informed decisions on land allocation and development.
            </li>
          </ul>{" "}
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Land Usage"
        severity="Good"
      />
    );
  };

  return (
    <div className="p-m-3">
      <Fieldset legend={getBadge()}>
        <div className="p-mb-4">{getRecommendationLand()}</div>
      </Fieldset>
    </div>
  );
};

export default LandRecommendations;
