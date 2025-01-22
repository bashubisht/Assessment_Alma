
export const schema = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    email: { type: "string", format: "email", title: "Email" },
    countryOfCitizenship: {
      type: "string",
      enum: ["United States", "Canada", "India", "Australia", "Other"],
      title: "Country of Citizenship",
    },
    linkedinUrl: { 
      type: "string", 
      format: "uri", 
      title: "LinkedIn / Personal Website URL" 
    },
    visaCategories: {
      type: "string",
      enum: ["O-1", "EB-1A", "EB-2 NIW", "I don’t know"],
      title: "",
      uniqueItems: true,
    },
    helpMessage: { 
      type: "string", 
      title: "How can we help you? ",
      description: "What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
    },
    
  },
  required: ["firstName", "lastName", "email", "linkedinUrl", "visaCategories", "helpMessage"],
};

  
export const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName", options: { placeholder: "First Name" } },
    { type: "Control", scope: "#/properties/lastName", options: { placeholder: "Last Name" } },
    { type: "Control", scope: "#/properties/email", options: { placeholder: "Email" } },
    { type: "Control", scope: "#/properties/countryOfCitizenship", options: { placeholder: "Country of Citizenship" } },
    { type: "Control", scope: "#/properties/linkedinUrl", options: { placeholder: "LinkedIn / Personal Website URL" } },
    {
      type: "CustomCubeIcon",
    },
    {
      
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "Visa categories of interest?",
        },
        {
          type: "Control",
          scope: "#/properties/visaCategories",
          options: {
            format: "radio",
            hideRequiredAsterisk: true 
          },
        },
      ],
    },
    {
      type: "CustomHeartIcon",
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "How can we help you?",
        },
       
      ]
    },
        {
          type: "Control",
          scope: "#/properties/helpMessage",
          options: {
          multi: true,
          rows: 6, 
         
         },

       },
      ],
    };
  

  
  
