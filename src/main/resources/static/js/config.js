// ======================================
// HMS PRO API CONFIGURATION
// ======================================

const LOCAL_URL = "http://localhost:8080";

const RENDER_URL =
    "https://hospital-management-system-6pok.onrender.com";


// Detect environment

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? LOCAL_URL
        : RENDER_URL;


// Authentication API

const AUTH_API = API_URL + "/auth";


// Debug

console.log("Backend URL:", API_URL);