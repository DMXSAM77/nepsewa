// ============================================================
//  NepSewa — Shared Provider Data
//  Used by: provider.html, nepsewa.html, servv.html
// ============================================================

const PROVIDERS = [
    {
        id: 1,
        name: "Ram Bahadur",
        service: "Electric Repair",
        serviceKey: "electrician",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.8,
        experience: 5,
        completedJobs: 312,
        cancellationRate: 0.02,
        responseTimeHours: 1.5,
        isVerified: true,
        reviewCount: 148,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "9801000001",
        availability: ["Mon","Tue","Wed","Thu","Fri","Sat"]
    },
    {
        id: 2,
        name: "Sita Lama",
        service: "Home Cleaning",
        serviceKey: "cleaning",
        location: "Lalitpur",
        district: "Lalitpur",
        rating: 4.9,
        experience: 6,
        completedJobs: 420,
        cancellationRate: 0.01,
        responseTimeHours: 1.0,
        isVerified: true,
        reviewCount: 210,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        phone: "9801000002",
        availability: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    },
    {
        id: 3,
        name: "Hari Sharma",
        service: "Plumbing",
        serviceKey: "plumber",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.7,
        experience: 4,
        completedJobs: 198,
        cancellationRate: 0.03,
        responseTimeHours: 2.0,
        isVerified: true,
        reviewCount: 95,
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        phone: "9801000003",
        availability: ["Mon","Tue","Wed","Thu","Fri"]
    },
    {
        id: 4,
        name: "Gita KC",
        service: "Spa & Massage",
        serviceKey: "makeup",
        location: "Bhaktapur",
        district: "Bhaktapur",
        rating: 5.0,
        experience: 4,
        completedJobs: 175,
        cancellationRate: 0.00,
        responseTimeHours: 2.5,
        isVerified: true,
        reviewCount: 88,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        phone: "9801000004",
        availability: ["Tue","Wed","Thu","Fri","Sat","Sun"]
    },
    {
        id: 5,
        name: "Ramesh Tamang",
        service: "Hair Cutting",
        serviceKey: "haircutting",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.2,
        experience: 2,
        completedJobs: 89,
        cancellationRate: 0.07,
        responseTimeHours: 3.0,
        isVerified: false,
        reviewCount: 42,
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        phone: "9801000005",
        availability: ["Mon","Wed","Fri","Sat","Sun"]
    },
    {
        id: 6,
        name: "Suman Rai",
        service: "Home Cleaning",
        serviceKey: "cleaning",
        location: "Lalitpur",
        district: "Lalitpur",
        rating: 4.7,
        experience: 3,
        completedJobs: 134,
        cancellationRate: 0.04,
        responseTimeHours: 2.0,
        isVerified: true,
        reviewCount: 67,
        image: "https://randomuser.me/api/portraits/men/66.jpg",
        phone: "9801000006",
        availability: ["Mon","Tue","Thu","Fri","Sat"]
    },
    {
        id: 7,
        name: "Binod KC",
        service: "AC Service",
        serviceKey: "ac",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.5,
        experience: 4,
        completedJobs: 220,
        cancellationRate: 0.03,
        responseTimeHours: 2.0,
        isVerified: true,
        reviewCount: 110,
        image: "https://randomuser.me/api/portraits/men/88.jpg",
        phone: "9801000007",
        availability: ["Mon","Tue","Wed","Thu","Fri","Sat"]
    },
    {
        id: 8,
        name: "Anita Thapa",
        service: "Maid Service",
        serviceKey: "maid",
        location: "Bhaktapur",
        district: "Bhaktapur",
        rating: 4.6,
        experience: 7,
        completedJobs: 380,
        cancellationRate: 0.02,
        responseTimeHours: 1.5,
        isVerified: true,
        reviewCount: 190,
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        phone: "9801000008",
        availability: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    },
    {
        id: 9,
        name: "Deepak Gurung",
        service: "Plumbing",
        serviceKey: "plumber",
        location: "Bhaktapur",
        district: "Bhaktapur",
        rating: 4.4,
        experience: 3,
        completedJobs: 112,
        cancellationRate: 0.05,
        responseTimeHours: 3.5,
        isVerified: false,
        reviewCount: 55,
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        phone: "9801000009",
        availability: ["Tue","Wed","Fri","Sat"]
    },
    {
        id: 10,
        name: "Priya Shrestha",
        service: "Makeup Artist",
        serviceKey: "makeup",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.8,
        experience: 5,
        completedJobs: 260,
        cancellationRate: 0.02,
        responseTimeHours: 2.0,
        isVerified: true,
        reviewCount: 130,
        image: "https://randomuser.me/api/portraits/women/58.jpg",
        phone: "9801000010",
        availability: ["Mon","Wed","Thu","Fri","Sat","Sun"]
    },
    {
        id: 11,
        name: "Rajesh Pandey",
        service: "Gardener",
        serviceKey: "gardener",
        location: "Lalitpur",
        district: "Lalitpur",
        rating: 4.3,
        experience: 6,
        completedJobs: 145,
        cancellationRate: 0.06,
        responseTimeHours: 4.0,
        isVerified: false,
        reviewCount: 72,
        image: "https://randomuser.me/api/portraits/men/62.jpg",
        phone: "9801000011",
        availability: ["Mon","Tue","Thu","Sat","Sun"]
    },
    {
        id: 12,
        name: "Nisha Maharjan",
        service: "Photographer",
        serviceKey: "photographer",
        location: "Kathmandu",
        district: "Kathmandu",
        rating: 4.9,
        experience: 8,
        completedJobs: 310,
        cancellationRate: 0.01,
        responseTimeHours: 3.0,
        isVerified: true,
        reviewCount: 155,
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        phone: "9801000012",
        availability: ["Fri","Sat","Sun"]
    }
];

// ============================================================
//  PRIMARY ALGORITHM — Service Provider Matching
//  Filters providers by: service type, location, date availability
// ============================================================
function matchProviders({ serviceKey = "", location = "", dayName = "", minRating = 0 }) {
    return PROVIDERS.filter(p => {
        const serviceMatch  = !serviceKey || p.serviceKey === serviceKey;
        const locationMatch = !location   || p.location === location;
        const ratingMatch   = p.rating >= minRating;
        const dayMatch      = !dayName    || p.availability.includes(dayName);
        return serviceMatch && locationMatch && ratingMatch && dayMatch;
    });
}

// ============================================================
//  SECONDARY ALGORITHM — Service Provider Ranking
//  Score = (rating × 2) + experience + (completedJobs × 0.005)
//          - (cancellationRate × 10) + locationBonus
// ============================================================
function rankProviders(list, preferredLocation = "") {
    return list
        .map(p => {
            let score = (p.rating * 2)
                      + p.experience
                      + (p.completedJobs * 0.005)
                      - (p.cancellationRate * 10);
            if (preferredLocation && p.location === preferredLocation) score += 1.5;
            if (p.isVerified) score += 0.5;
            return { ...p, _score: score };
        })
        .sort((a, b) => b._score - a._score);
}
