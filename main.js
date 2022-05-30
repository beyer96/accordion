const data = [
    { title: "Nadpis 1", description: "Toto je odstavec prvního řádku komponenty accordion" },
    { title: "Nadpis 2", description: "Toto je odstavec druhého řádku komponenty accordion" },
    { title: "Nadpis 3", description: "Toto je odstavec třetího řádku komponenty accordion" }
];


// styles
const sectionStyle = `
    text-align: center;
`;
const accordionStyle = `
    width: 800px;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 10px;
`;
const accordionElementTitleStyle = `
    background-color: rgb(250, 128, 114);
    margin: 0;
    padding: 1rem 2rem;
    box-sizing: border-box;
    cursor: pointer;
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

// function for creating whole accordion component
const createAccordion = (data) => {
    let section = document.createElement("section");
    let sectionHeader = document.createElement("h2");
    let accordion = document.createElement("div");

    section.style = sectionStyle;
    accordion.style = accordionStyle;

    sectionHeader.innerText = "Accordion";
    section.appendChild(sectionHeader);

    // populate accordion with single elements for each object in data array
    data.forEach(accordionData => accordion.appendChild(createAccordionElement(accordionData)));

    section.appendChild(accordion);
    document.body.appendChild(section);
}

// function for creating single accordion element for each object in data array
const createAccordionElement = (accordionData) => {
    let accordionElement = document.createElement("div");
    let accordionElementTitle = document.createElement("h3");
    let accordionElementBody = document.createElement("p");

    accordionElementTitle.style = accordionElementTitleStyle;
    accordionElementBody.style = accordionElementBodyStyle;

    accordionElementTitle.innerText = accordionData.title;

    // event listeners simulating CSS :hover selector
    accordionElementTitle.addEventListener("mouseenter", () => {
        accordionElementTitle.style.backgroundColor = "rgb(250, 100, 90)";
    });
    accordionElementTitle.addEventListener("mouseleave", (e) => {
        // don't toggle bg-color if element is currently active (displayed)
        if(e.target.nextSibling.classList.contains("active")) return
        accordionElementTitle.style.backgroundColor = "rgb(250, 128, 114)";
    })

    // on click - show/hide accordion' content + style properly
    accordionElementTitle.addEventListener("click", (e) => {
        // first of all, closing every active (displayed) element, if there are any
        document.querySelectorAll(".active").forEach(activeElement => {
            // exception, if currently clicked element is active - do nothing here and behave accordingly to if/else block below
            if(activeElement == e.target.nextSibling) return
            // close every other active element
            activeElement.style.maxHeight = "0"
            activeElement.style.padding = "0";
            activeElement.previousSibling.style.backgroundColor = "rgb(250, 128, 114)";
            activeElement.classList.remove("active")
        })
        // toggle clicked element
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
    
    // add description to <p> tag
    accordionElementBody.innerText = accordionData.description;

    accordionElement.appendChild(accordionElementTitle);
    accordionElement.appendChild(accordionElementBody);
    
    return accordionElement;
}

window.addEventListener("load", () => createAccordion(data));