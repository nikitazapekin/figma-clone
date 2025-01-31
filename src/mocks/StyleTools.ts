
export const styleTools = [
    {
        id: 1,

        title: "CoordX",
        value: "111",
        placeholder: "X coordinate",
        field: "coordX",
        type: ["round", "triangle", "square", "line", "text"]


    },
    {
        id: 2,
        title: "CoordY",
        value: "111",
        placeholder: "Y coordinate",
        field: "coordY",
        type: ["round", "triangle", "square", "line", "text"]

    },

    {
        id: 3,
        title: "Opacity",
        value: "1",
        placeholder: "0..1",
        field: "opacity",
        type: ["round", "triangle", "square", "line", "text"]

    },

    {
        id: 4,
        title: "Border",
        value: "0",
        placeholder: "0px",
        field: "border",
        type: ["round", "triangle", "square",]  

    },
    {
        id: 21,
        title: "Width",
        value: "0",
        placeholder: "0px",
        field: "width",
        type: ["round", "triangle", "square",]  

    },
    {
        id: 22,
        title: "Height",
        value: "0",
        placeholder: "0px",
        field: "height",
        type: ["round", "triangle", "square",]  

    },
    {
        id: 5,
        title: "Background",
        value: "",
        placeholder: "#fff",
        field: "background",
        type: ["round", "triangle", "square", "line", "text"],

        nested: [

            {
                id: 14,
                title: "Color",
                value: "",
                placeholder: "#fff",
                field: "color",
                type: ["round", "triangle", "square", "line", "text"]


            },
            {

                id: 15,
                title: "Image",
                value: "",
                placeholder: "https://...",
                field: "image",
                type: ["round", "triangle", "square", "line", "text"]


            }
        ]
    },
    {
        id: 6,
        title: "Text",
        value: "",
        placeholder: "Lorem ipsum...",
        field: "image",
        type: ["text"]

    },

    {
        id: 7,
        title: "FontWeight",
        value: "",
        placeholder: "700",
        field: "fontWeight",
        type: ["text"]

    },
    {
        id: 8,
        title: "FontSize",
        value: "",
        placeholder: "22px",
        field: "fontSize",
        type: ["text"]

    },
    {
        id: 9,
        title: "FontFamily",
        value: "",
        placeholder: "Roboto",
        field: "fontFamily",
        type: ["text"]
    },
    {
        id: 10,
        title: "Stroke",
        value: "0",
        placeholder: "20px",
        field: "stroke",
        type: ["round", "triangle", "square", "line", "text"],
        nested: [
            {
                id: 19,
                title: "Stroke width",
                value: "0",
                placeholder: "0px",
                field: "stroke",
                type: ["round", "triangle", "square", "line", "text"]

            },
            {
                id: 20,
                title: "Stroke color",
                value: "0",
                placeholder: "#fff",
                field: "strokeColor",
                type: ["round", "triangle", "square", "line", "text"]

            },
        ]

    },
    {
        id: 11,
        title: "Shadow",
        value: "#fff",
        placeholder: "",
        field: "shadow",
        type: ["round", "triangle", "square", "line", "text"],
        nested: [
            {
                id: 12,
                title: "CoordX",
                value: "0",
                placeholder: "X coordinate",
                field: "shadowX",
                type: ["round", "triangle", "square", "line", "text"]

            },
            {
                id: 13,
                title: "CoordY",
                value: "0",
                placeholder: "Y coordinate",
                field: "shadowY",
                type: ["round", "triangle", "square", "line", "text"]

            },

            {
                id: 13,
                title: "Shadow color",
                value: "0",
                placeholder: "#fff",
                field: "shadowColor",
                type: ["round", "triangle", "square", "line", "text"]

            }
        ]
    }
]

/*
 width: number,
    height: number,

    opacity: number,
    bordred: number,
    background: string, 

    stroke: number, 
    strokeColor: string,
    shadowColor: string, 
    shadowX: number, 
    shadowY: number
    */