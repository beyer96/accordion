const data = [
    { title: "Nadpis 1", description: "Toto je odstavec prvního řádku komponenty accordion" },
    { title: "Nadpis 2", description: "Toto je odstavec druhého řádku komponenty accordion" },
    { title: "Nadpis 3", description: "Toto je odstavec třetího řádku komponenty accordion" }
];

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
    background-color: rgb(250, 128, 114);
    margin: 0;
    padding: 1rem 2rem;
    box-sizing: border-box;
`;
const accordionElementBodyStyle = `
    width: 100%;
    max-height: 0;    
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: lightgrey;
    transition: all 250ms;
    box-sizing: border-box;
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

    accordionElementTitle.addEventListener("mouseenter", () => {
        accordionElementTitle.style.cursor = "pointer";
        accordionElementTitle.style.backgroundColor = "rgb(250, 100, 90)";
    });
    accordionElementTitle.addEventListener("mouseleave", (e) => {
        if(e.target.nextSibling.classList.contains("active")) return
        accordionElementTitle.style.cursor = "pointer";
        accordionElementTitle.style.backgroundColor = "rgb(250, 128, 114)";
    })
    accordionElementTitle.addEventListener("click", (e) => {
        document.querySelectorAll(".active").forEach(activeElement => {
            if(activeElement == e.target.nextSibling) return

            activeElement.style.maxHeight = "0"
            activeElement.style.padding = "0";
            activeElement.previousSibling.style.backgroundColor = "rgb(250, 128, 114)";
            activeElement.classList.remove("active")
        })
        if (accordionElementBody.classList.contains("active")) {
            accordionElementBody.classList.remove("active");
            accordionElementBody.style.maxHeight = "0";
            accordionElementBody.style.padding = "0";
            accordionElementTitle.style.backgroundColor = "rgb(250, 128, 114)";
            
        } else {
            accordionElementBody.classList.add("active");
            accordionElementBody.style.maxHeight = "10rem";
            accordionElementBody.style.padding = "1rem 2rem";
            accordionElementTitle.style.backgroundColor = "rgb(250, 100, 90)";
        }
    })
    
    accordionElementBody.innerText = accordionData.description;

    accordionElement.appendChild(accordionElementTitle);
    accordionElement.appendChild(accordionElementBody);
    
    return accordionElement;
}

window.addEventListener("load", () => createAccordion(data));