import React, {useState} from "react";
import ContributorBlock from "./ContributorBlock";
import "./Contributors.css";

// A list of all of the contributors
function Contributors() {

  const [contributors] = useState([
    {
      contributorId: 1,
      imageUrl: "https://placekitten.com/500/500",
      name: "John Doe",
      title: "Energy Efficiency Center Director",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 2,
      imageUrl: "https://placekitten.com/1000/1000",
      name: "Jane Doe",
      title: "Assistant Director",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 3,
      imageUrl: "https://placekitten.com/200/200",
      name: "Alden Cantrell",
      title: "Operations Manager",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 4,
      imageUrl: "https://placekitten.com/250/250",
      name: "John Smith",
      title: "General Employee",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 5,
      imageUrl: "https://placekitten.com/150/150",
      name: "Jim Doe",
      title: "General Employee",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
  ]);

  return (
    <div className="container icon-page-container my-5">

      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Contributors
          </h4>
        </div>
      </div>

      <div className="prompt-container mb-3 py-4 bg-white card rounded shadow-sm">
        
        {/* General team message */}
        <div className="team-text-box-row row">
          <div className="contributor-content-block">
            <div className="contributor-inner-block">
              <h2>
                Our Team
              </h2>
              <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed vel lacus libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Quisque placerat lobortis nisl, eget volutpat nisl volutpat at. Mauris sit amet sem at magna scelerisque blandit.
              Curabitur odio. Vivamus lacinia sit amet sapien sed posuere. Maecenas vel imperdiet erat. Nullam cursus volutpat
              fringilla. Vestibulum rutrum ipsum risus, ac lobortis erat facilisis id. Sed mollis, ligula sed blandit tristique,
              justo odio porta libero, at iaculis mi felis non erat. Morbi a cursus dui. Suspendisse potenti. Quisque felis turpis,
              tincidunt id euismod at, semper ut tortor.
              </span>
            </div>
          </div>
        </div>

        {/* Individual contributors */}
        <div className="contributor-organizer my-4">
          {contributors.map((contributor) =>
            <ContributorBlock
              key={contributor.contributorId}
              name={contributor.name}
              imageUrl={contributor.imageUrl}
              title={contributor.title}
              description={contributor.description}
            />
          )}
        </div>
      
      </div>

    </div>
  );
}
export default Contributors;
