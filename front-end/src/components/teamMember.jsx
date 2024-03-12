import React from "react";
import 'boxicons';
import "../style/teamMember.css";

const TeamMember = () => {
    return (
        <div className="container our-team">
            <div className="row heading">
                <h2 className="text-center bottom-line">Meet Our Team</h2>
                <p className="subheading text-center">Creative Nerds</p>
            </div>
            <div className="row team-row">
                <div className="col-md-4 col-sm-6 team-wrap">
                    <div className="team-member text-center">
                        <div className="team-img">
                            <img src={process.env.PUBLIC_URL + '/images/@krunal.jpg'} alt="logo" />
                            <div className="overlay">
                                <div className="team-details text-center">
                                    <p>
                                        Problem solving skill at peak.
                                    </p>
                                    <div className="socials mt-20">
                                        <a href="#"><box-icon name='gmail' type='logo' color='#fafafa' ></box-icon></a>    
                                        <a href="#"><box-icon type='logo' name='linkedin-square' color='#fcf8f8'></box-icon></a>     
                                        <a href="#"><box-icon name='link' color='#fafafa' ></box-icon></a>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="team-title">Krunal Priyadarshi</h6>
                        <span>Full Stack Developer</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 team-wrap">
                    <div className="team-member text-center">
                        <div className="team-img">
                            <img src={process.env.PUBLIC_URL + '/images/@smit.png'} alt="logo" />
                            <div className="overlay">
                                <div className="team-details text-center">
                                    <p>
                                        Finds Salesforce solution by deep diving to Internet.
                                    </p>
                                    <div className="socials mt-20">
                                        <a href="#"><box-icon name='gmail' type='logo' color='#fafafa' ></box-icon></a>    
                                        <a href="#"><box-icon type='logo' name='linkedin-square' color='#fcf8f8'></box-icon></a>     
                                        <a href="#"><box-icon name='link' color='#fafafa' ></box-icon></a>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="team-title">Smit Hirpara</h6>
                        <span>Full Stack DEveloper</span>
                    </div>
                </div>                
                <div className="col-md-4 col-sm-6 team-wrap">
                    <div className="team-member text-center">
                        <div className="team-img">
                            <img src={process.env.PUBLIC_URL + '/images/@pratik.png'} alt="logo" />
                            <div className="overlay">
                                <div className="team-details text-center">
                                    <p>
                                        Real strategy and guidance done.
                                    </p>
                                    <div className="socials mt-20">
                                        <a href="#"><box-icon name='gmail' type='logo' color='#fafafa' ></box-icon></a>    
                                        <a href="#"><box-icon type='logo' name='linkedin-square' color='#fcf8f8'></box-icon></a>     
                                        <a href="#"><box-icon name='link' color='#fafafa' ></box-icon></a>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="team-title">Pratikkumar Bhingaradiya</h6>
                        <span>Front-end Designer</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMember;