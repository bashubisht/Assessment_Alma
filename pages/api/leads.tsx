import type { NextApiRequest, NextApiResponse } from "next";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedinUrl?: string;
  visaCategories?: string; 
  helpMessage?: string;
  state: string;
  submittedAt: string;
}

// In-memory store for leads
let leads: Lead[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Return the list of leads
    console.log("Returning Leads:", leads);
    return res.status(200).json(leads);
  }

  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      countryOfCitizenship,
      linkedinUrl,
      visaCategories,
      helpMessage,
    } = req.body as Partial<Lead>;

    // Validate required fields
    if (!firstName || !lastName || !email || !countryOfCitizenship) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newLead: Lead = {
      id: leads.length + 1,
      firstName,
      lastName,
      email,
      countryOfCitizenship,
      linkedinUrl,
      visaCategories,
      helpMessage,
      state: "PENDING",
      submittedAt: new Date().toLocaleString(),
    };

    leads.push(newLead);
    console.log("New Lead Added:", newLead);
    return res.status(201).json(newLead);
  }

  if (req.method === "PUT") {
    // Update the state of a lead
    const { id, state } = req.body as { id: number; state: string };

    if (typeof id !== "number" || typeof state !== "string") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const leadIndex = leads.findIndex((lead) => lead.id === id);
    if (leadIndex > -1) {
      leads[leadIndex].state = state;
      return res.status(200).json(leads[leadIndex]);
    } else {
      return res.status(404).json({ error: "Lead not found" });
    }
  }

  // If the request method is anything else, return an error
  return res.status(405).json({ error: "Method not allowed" });
}