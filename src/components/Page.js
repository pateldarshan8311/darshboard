import React from 'react';
import WorkExperience from './WorkExperienceComponent';
import ProfileBox from './ProfileBox';
import { StatsComponent, CountersComponent } from './StatsComponent';
import StacksComponent from './StacksComponent';
import BasicDetailsComponent from './BasicDetailsComponent';
import ContactForm from './ContactForm'; // 🔼 Add this at the top
import ServiceCardsComponent from "./ServiceCardsComponent";
import FaqsComponent from './FaqsComponent';
import ClientSuccessComponent from "./ClientSuccessComponent";
import BenefitsComponent from './BenefitsComponent';
import ClientsComponent from './ClientsComponent';


import { motion } from 'framer-motion';
import '../css/MainContent.css';

const delayStep = 0.2;

// AnimatedBox wraps content with animation and required classes
const AnimatedBox = ({ children, index, className = '', disableDefaultClass = false }) => (
  <motion.div
    className={disableDefaultClass ? className : `comm_box_design comm_border_after d_flex ${className}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * delayStep }}
  >
    {children}
  </motion.div>
);


const Page = ({ pageData }) => {
  if (!pageData) return <p>⚠ Page not found!</p>;

  const acf = pageData.acf || {};
  const basicDetails = acf.basic_details || acf;

  // console.log('Page ACF:', acf);
  // console.log('Work Experience Data:', acf.work_experience);

  return (
    <div className="page-content">
      {/* Render WordPress content */}
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />

      {/* Animate sections only on About Me page */}
      {pageData.slug === 'about-me' && (
        <div className="comm_box_grid">
          {/* Profile Box */}
          <AnimatedBox index={0}>
            <ProfileBox acfData={acf} />
          </AnimatedBox>

          {/* Stats & Counters */}
          <AnimatedBox index={1}>
            <StatsComponent statsData={acf.statistics_items} />
            <CountersComponent countersData={acf.my_counters} />
          </AnimatedBox>

          {/* Stacks Section */}
          <AnimatedBox index={2} className="flex_column p_0">
            <StacksComponent stackData={acf} />
          </AnimatedBox>

          {/* Basic Details Section */}
          <AnimatedBox index={3} className="flex_column">
            <BasicDetailsComponent basicDetails={basicDetails} />
          </AnimatedBox>

          {/* Work Experience Section */}
          <AnimatedBox index={4} className="flex_column p_0">
            <WorkExperience data={acf} />
          </AnimatedBox>

          {/* Form Section */}
          <AnimatedBox index={5} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>

        </div>
      )}

      {/* Render only on Services page */}
      {pageData.slug === 'services' && (
        <div className="comm_box_grid services_card_grid">
          <AnimatedBox index={0} className="flex_column services_card_main p_0" disableDefaultClass={true}>
            <ServiceCardsComponent serviceCards={acf.service_cards} />
          </AnimatedBox>
          <AnimatedBox index={1} className="flex_column p_0">
            <BenefitsComponent data={pageData} />
          </AnimatedBox>
          <AnimatedBox index={2} className="flex_column p_0">
            <FaqsComponent stackData={acf} />
          </AnimatedBox>
          <AnimatedBox index={3} className="flex_column p_0">
            <ClientSuccessComponent clientData={pageData.acf} />
          </AnimatedBox>

          <AnimatedBox index={3} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>

        </div>
      )}


      {/* Render only on Services page */}
      {pageData.slug === 'my-works' && (
        <div className="comm_box_grid services_card_grid">
          <div className='services_card_main d_flex flex_column work_2_cols'>
            <AnimatedBox index={0} className=" clients_slider p_0" disableDefaultClass={true}>
              <ClientsComponent clientData={acf} />
            </AnimatedBox>
            {/* Stats & Counters */}
            <AnimatedBox index={1} className=" work_cards" >
              <StatsComponent statsData={acf.statistics_items} />
              <CountersComponent countersData={acf.my_counters} />
            </AnimatedBox>
          </div>

          <AnimatedBox index={2} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>
        </div>
      )}


    </div>
  );
};

export default Page;