export async function getLocationFromIP(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    console.log("IP-API RESPONSE:", data);

    if (data.status !== "success") {
      return "Unknown location";
    }

    const city = data.city || "Unknown city";
    const country = data.country || "Unknown country";

    return `${city}, ${country}`;
  } catch (err) {
    console.error("Location error:", err);
    return "Unknown location";
  }
}
