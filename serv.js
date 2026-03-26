function showDetails(service) {
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");

    if (service === "maid") {
        title.innerText = "Maid Service";
        desc.innerText = "Professional Nepali maids for daily household tasks like cleaning, cooking, and laundry.";
    }

    else if (service === "technician") {
        title.innerText = "Technician Service";
        desc.innerText = "Skilled technicians for repairing appliances like TV, fridge, and washing machine.";
    }

    else if (service === "plumber") {
        title.innerText = "Plumber Service";
        desc.innerText = "Experienced plumbers for fixing leaks, pipes, and water systems in your home.";
    }

    else if (service === "electrician") {
        title.innerText = "Electrician Service";
        desc.innerText = "Certified electricians for wiring, switch repair, and electrical installations.";
    }

    else if (service === "cleaning") {
        title.innerText = "Home Cleaning";
        desc.innerText = "Complete home cleaning service including kitchen, bathroom, and living areas.";
    }

    else if (service === "ac") {
        title.innerText = "AC Repair";
        desc.innerText = "AC installation, servicing, and repair by trained professionals.";
    }
}