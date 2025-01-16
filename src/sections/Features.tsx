'use client'
import ProductImage from '@/assets/product-image.png'
import StarsBg from '@/assets/stars.png'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import { Rocket, ShieldCheck } from 'lucide-react'

const tabs = [
  {
    IconComponent: Rocket,
    title: 'User-friendly setup',
    isNew: true,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    IconComponent: ShieldCheck,
    title: 'Secure & stable payments',
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
]

const FeatureTab = (props: (typeof tabs)[number] & ComponentPropsWithoutRef<'div'> & { selected: boolean }) => {
  const tabRef = useRef<HTMLDivElement>(null)
  const xPercentage = useMotionValue(0)
  const yPercentage = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`

  useEffect(() => {
    if (!tabRef.current || !props.selected) return

    xPercentage.set(0)
    yPercentage.set(0)

    const { height, width } = tabRef.current.getBoundingClientRect()
    const circumference = height * 2 + width * 2
    const times = [0, width / circumference, (width + height) / circumference, (width * 2 + height) / circumference, 1]

    const options: ValueAnimationTransition = {
      times: times,
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
    }

    animate(xPercentage, [0, 100, 100, 0, 0], options)
    animate(yPercentage, [0, 0, 100, 100, 0], options)
  }, [props.selected, xPercentage, yPercentage])

  const IconComponent = props.IconComponent

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative cursor-pointer"
      ref={tabRef}
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            maskImage: maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#FF863B] rounded-xl"
        />
      )}
      <motion.div
        whileHover={{ rotate: 10 }}
        className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center bg-white/5"
      >
        <IconComponent className="h-5 w-5 text-white/70" />
      </motion.div>
      <div className="font-medium">{props.title}</div>
      {props.isNew && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-xs rounded-full px-2 py-0.5 bg-[#FF863B] text-black font-semibold"
        >
          new
        </motion.div>
      )}
    </motion.div>
  )
}

export const Features = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  const handleSelectTab = (index: number) => {
    setSelectedTab(index)

    const options: ValueAnimationTransition = {
      duration: 2,
      ease: 'easeInOut',
    }

    animate(backgroundSizeX, [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX], options)
    animate(backgroundPositionX, [backgroundPositionX.get(), tabs[index].backgroundPositionX], options)
    animate(backgroundPositionY, [backgroundPositionY.get(), tabs[index].backgroundPositionY], options)
  }

  const { scrollYProgress } = useScroll()
  const starsBackgroundY = useTransform(scrollYProgress, [0, 1], [-300, 300])

  return (
    <motion.section
      className="py-20 md:py-24 bg-black relative overflow-visible"
      style={{
        backgroundImage: `url(${StarsBg.src})`,
        backgroundPositionY: starsBackgroundY,
        backgroundSize: 'cover',
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-medium text-center tracking-tighter text-white"
        >
          Easily integrate into your merchant website
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5"
        >
          StablePay offers a seamless SDK for merchants to accept Djed stablecoins effortlessly.
        </motion.p>

        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab, index) => (
            <FeatureTab selected={selectedTab === index} onClick={() => handleSelectTab(index)} {...tab} key={index} />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="border border-white/20 p-2.5 rounded-xl mt-3"
        >
          <motion.div
            className="aspect-video bg-cover border border-white/20 rounded-lg"
            style={{
              backgroundImage: `url(${ProductImage.src})`,
              backgroundPosition: backgroundPosition,
              backgroundSize: backgroundSize,
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
