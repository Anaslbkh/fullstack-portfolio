"use client";
import ContactForm from "../components/ContactForm"
import '../globals.css';
export default function Contact(){
    return(
        <div className="container mx-auto md:px-10 animated-background">
            <div className="z-40">
                <ContactForm />
            </div>
        </div>
    )
}