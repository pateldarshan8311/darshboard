import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'; // ✅ Lenis import

import WorkExperience from './WorkExperienceComponent';
import ProfileBox from './ProfileBox';
import { StatsComponent, CountersComponent } from './StatsComponent';
import StacksComponent from './StacksComponent';
import BasicDetailsComponent from './BasicDetailsComponent';
import ContactForm from './ContactForm';
import ServiceCardsComponent from "./ServiceCardsComponent";
import FaqsComponent from './FaqsComponent';
import ClientSuccessComponent from "./ClientSuccessComponent";
import BenefitsComponent from './BenefitsComponent';
import ClientsComponent from './ClientsComponent';
import ProjectsComponent from "./ProjectsComponent";

import { motion } from 'framer-motion';
import '../css/MainContent.css';

const delayStep = 0.1;

// ✅ Smooth scroll setup using Lenis
const Page = ({ pageData }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // ✅ Clean up
    };
  }, []);

  if (!pageData) return <p>⚠ Page not found!</p>;

  const acf = pageData.acf || {};
  const basicDetails = acf.basic_details || acf;

  // Animation wrapper
  const AnimatedBox = ({ children, index, className = '', disableDefaultClass = false }) => (
    <motion.div
      className={disableDefaultClass ? className : `comm_box_design comm_border_after d_flex ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * delayStep }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="page-content">
      {/* Render WordPress content */}
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />

      {/* Animate sections only on About Me page */}
      {pageData.slug === 'about-me' && (
        <div className="comm_box_grid">
          <AnimatedBox index={0}>
            <ProfileBox acfData={acf} />
          </AnimatedBox>

          <AnimatedBox index={1}>
            <StatsComponent statsData={acf.statistics_items} />
            <CountersComponent countersData={acf.my_counters} />
          </AnimatedBox>

          <AnimatedBox index={2} className="flex_column p_0">
            <StacksComponent stackData={acf} />
          </AnimatedBox>

          <AnimatedBox index={3} className="flex_column">
            <BasicDetailsComponent basicDetails={basicDetails} />
          </AnimatedBox>

          <AnimatedBox index={4} className="flex_column p_0">
            <WorkExperience data={acf} />
          </AnimatedBox>

          <AnimatedBox index={5} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>
        </div>
      )}

      {/* Render only on Services page */}
      {pageData.slug === 'services' && (
        <div className="comm_box_grid services_card_grid">
          {/* Count total delay time based on number of cards */}
          {(() => {
            const serviceCardsCount = Array.isArray(acf.service_cards) ? acf.service_cards.length : 0;
            const cardDelayTotal = serviceCardsCount * delayStep;

            return (
              <>
                <AnimatedBox index={0} className="flex_column services_card_main p_0" disableDefaultClass={true}>
                  <ServiceCardsComponent serviceCards={acf.service_cards} baseDelay={0.1} />
                </AnimatedBox>

                <AnimatedBox index={1 + serviceCardsCount} className="flex_column p_0 skills_row">
                  <BenefitsComponent data={pageData} />
                </AnimatedBox>

                <AnimatedBox index={2 + serviceCardsCount} className="flex_column p_0">
                  <FaqsComponent stackData={acf} />
                </AnimatedBox>

                <AnimatedBox index={3 + serviceCardsCount} className="flex_column p_0">
                  <ContactForm />
                </AnimatedBox>
              </>
            );
          })()}
        </div>
      )}


      {/* Render only on My Works page */}
      {pageData.slug === 'my-works' && (
        <div className="comm_box_grid services_card_grid">
          <div className='services_card_main d_flex flex_column work_2_cols'>
            <AnimatedBox index={0} className=" clients_slider p_0" disableDefaultClass={true}>
              <ClientsComponent clientData={acf} />
            </AnimatedBox>

            <AnimatedBox index={1} className=" work_cards">
              <CountersComponent countersData={acf.my_counters} />
            </AnimatedBox>
          </div>

          <AnimatedBox index={3} className="flex_column p_0">
            <ClientSuccessComponent clientData={pageData.acf} />
          </AnimatedBox>

          <div className='services_card_main d_flex flex_column projects_cols w_100 work_2_cols'>
            <AnimatedBox index={2} className="flex_column p_0">
              <ProjectsComponent projectsData={acf} />
            </AnimatedBox>
          </div>

          <AnimatedBox index={3} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>
        </div>
      )}
    </div>
  );
};

export default Page;
