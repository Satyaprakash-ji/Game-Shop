import "./Contact.css"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

const Contact = () => {
  return (
    <div>
      <section className="contactPage">
        <div className="heading">
          <small>Get in touch...</small>
          <h1> Contact Us</h1>
        </div>
        <div className="messageUsSection">
          <div className="textContent">
            <h3>Message Us</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
              voluptates eos rerum quod nobis eaque consectetur incidunt
              deserunt odio animi.
            </p>
            <p className="location">
              <p>
                <span>
                  <LocationOnIcon />
                </span>
                156 Sixth Avenue, Nashik Nagar, NN 20990
              </p>
              <p>
                {" "}
                <span>
                  <EmailTwoToneIcon />
                </span>{" "}
                gameshopcontact@gmail.com
              </p>
              <p>
                <span>
                  <LocalPhoneRoundedIcon />
                </span>
                +91 9876543210
              </p>
            </p>
          </div>
          <div className="contactForm">
            <form
              action="https://formsubmit.co/sprakash9120@gmail.com"
              method="POST"
            >
              <input
                type="hidden"
                name="_next"
                value="http://shringaar.netlify.app/contact"
              />
              <div className="name">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  required
                />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                id="contactEmail"
                placeholder="email Id"
                required
              />

              <textarea
                id="story"
                name="story"
                rows="5"
                cols="15"
                placeholder="I recently had the pleasure of discovering Game Shop..."
              ></textarea>

              <button
              className="send-button"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
