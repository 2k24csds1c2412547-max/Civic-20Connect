import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MapPin, Shield, Siren, Navigation, ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const helplines = [
  { name: "Emergency (All India)", number: "112" },
  { name: "Women Helpline", number: "181" },
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "108" },
  { name: "Fire", number: "101" },
];

const policeStations = [
  { name: "Central Police Station", address: "Main St & 3rd Ave", lat: 28.6139, lng: 77.209 },
  { name: "North Zone Police", address: "Oak Ave, Sector 12", lat: 28.7041, lng: 77.1025 },
  { name: "City Women Cell", address: "Civic Center Road", lat: 28.5355, lng: 77.391 },
];

const municipalOffices = [
  { name: "Municipal HQ", address: "Civic Center", lat: 28.6207, lng: 77.2273 },
  { name: "Ward Office - West", address: "West End Blvd", lat: 28.6692, lng: 77.4538 },
  { name: "Ward Office - South", address: "Green Park", lat: 28.5494, lng: 77.2001 },
];

export default function Safety() {
  const openInMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  const shareLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        window.open(url, "_blank");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-civic-blue-900">Safety & SOS</h1>
            <p className="text-sm text-civic-blue-600">Emergency services and nearby authorities</p>
          </div>
          <Button asChild>
            <Link to="/report">Report Issue</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Women SOS */}
        <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Siren className="w-6 h-6" />
              Women SOS
            </CardTitle>
            <CardDescription className="text-pink-100">
              Quick access to emergency help and location sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-white text-rose-600 hover:bg-gray-100">
                <a href="tel:181">
                  <Phone className="w-4 h-4 mr-2" /> Call 181
                </a>
              </Button>
              <Button asChild className="bg-white text-rose-600 hover:bg-gray-100">
                <a href="tel:112">
                  <Phone className="w-4 h-4 mr-2" /> Call 112
                </a>
              </Button>
              <Button onClick={shareLiveLocation} variant="outline" className="border-white text-white">
                <Navigation className="w-4 h-4 mr-2" /> Share Live Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Helplines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-civic-blue-900">
              <Phone className="w-5 h-5" />
              Helpline Numbers
            </CardTitle>
            <CardDescription>Tap to call</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {helplines.map((h) => (
                <a key={h.number} href={`tel:${h.number}`} className="p-4 rounded-lg border hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{h.name}</div>
                    <div className="text-sm text-gray-600">{h.number}</div>
                  </div>
                  <Badge className="bg-civic-blue-500">Call</Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Police Stations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-civic-blue-900">
              <Shield className="w-5 h-5" /> Nearby Police Stations
            </CardTitle>
            <CardDescription>Open directions in Google Maps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {policeStations.map((p) => (
                <div key={p.name} className="p-4 rounded-lg border bg-white">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {p.address}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" onClick={() => openInMaps(p.lat, p.lng)}>
                      <MapPin className="w-4 h-4 mr-1" /> Open in Maps
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href="tel:100">Call Police</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Municipal Offices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-civic-blue-900">
              <Building2 className="w-5 h-5" /> Nearby Municipal Offices
            </CardTitle>
            <CardDescription>Reach your local ward offices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {municipalOffices.map((m) => (
                <div key={m.name} className="p-4 rounded-lg border bg-white">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {m.address}
                  </div>
                  <div className="mt-2">
                    <Button size="sm" onClick={() => openInMaps(m.lat, m.lng)}>
                      <MapPin className="w-4 h-4 mr-1" /> Open in Maps
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
