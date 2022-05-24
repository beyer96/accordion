const data = [
    { title: "Nadpis 1", description: "Toto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordionToto je odstavec prvního řádku komponenty accordion" },
    { title: "Nadpis 2", description: "Toto je odstavec druhého řádku komponenty accordion" },
    { title: "Nadpis 3", description: "Toto je odstavec třetího řádku komponenty accordion" }
];

document.body.style = "height: 100vh;"

const sectionStyle = `
    text-align: center;
`;
const accordionStyle = `
    width: 800px;
    overflow: hidden;
    margin: 0 auto;
`;

const accordionElementStyle = `
    
`;
const accordionElementTitleStyle = `
    background-color: salmon;
    margin: 0;
    padding: 1rem 2rem;
    box-sizing: border-box;
`;
const accordionElementBodyStyle = `
    height: 0px;    
    overflow: hidden;
    margin: 0;
    background: lightgrey;
`;

const createAccordion = (data) => {
    let section = document.createElement("section");
    let sectionHeader = document.createElement("h2");
    let accordion = document.createElement("div");

    section.style = sectionStyle;
    accordion.style = accordionStyle;

    sectionHeader.innerText = "Accordion";
    section.appendChild(sectionHeader);

    accordion.classList.add("accordion");

    // pushing single accordion elements inside accordion
    data.forEach(accordionData => accordion.appendChild(createAccordionElement(accordionData)));

    section.appendChild(accordion);
    document.body.appendChild(section);
}

const createAccordionElement = (accordionData) => {
    let accordionElement = document.createElement("div");
    let accordionElementTitle = document.createElement("h3");
    let accordionElementBody = document.createElement("p");

    accordionElement.style = accordionElementStyle;
    accordionElementTitle.style = accordionElementTitleStyle;
    accordionElementBody.style = accordionElementBodyStyle;

    accordionElementTitle.innerText = accordionData.title;
    accordionElementTitle.addEventListener("mouseover", () => accordionElementTitle.style.cursor = "pointer");
    accordionElementTitle.addEventListener("click", () => {
        if (accordionElementBody.style.height == "auto") {
            accordionElementBody.style.transition = "height 250ms"
            accordionElementBody.style.height = "0px";
            
        } else {
            accordionElementBody.style.height = "auto";
        }
    })
    
    accordionElementBody.innerText = accordionData.description;

    accordionElement.appendChild(accordionElementTitle);
    accordionElement.appendChild(accordionElementBody);
    
    return accordionElement;
}

window.addEventListener("load", () => createAccordion(data));