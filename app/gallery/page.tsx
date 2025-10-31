"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Heart,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Play,
  Smile,
} from "lucide-react";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

const Gallery = () => {
  const galleryImages = [
    {
      id: "1",
      src: "/images/gallery/gallery1.jpg",
      alt: "Bright and colorful classroom with learning centers",
      title: "Learning Centers",
      description:
        "Our classrooms are designed to inspire creativity and exploration with age-appropriate learning materials.",
    },
    {
      id: "2",
      src: "/images/gallery/gallery2.jpg",
      alt: "Outdoor playground with safe equipment",
      title: "Outdoor Playground",
      description:
        "Safe and engaging outdoor spaces where children can develop gross motor skills and socialize.",
    },
    {
      id: "3",
      src: "/images/gallery/gallery3.jpg",
      alt: "Art studio with children creating artwork",
      title: "Art Studio",
      description:
        "Creative spaces where children express themselves through various art mediums and techniques.",
    },
    {
      id: "4",
      src: "/images/gallery/gallery4.jpg",
      alt: "Cozy library corner with books and reading nooks",
      title: "Library Corner",
      description:
        "A quiet space filled with books to foster a love of reading and literacy development.",
    },
    {
      id: "5",
      src: "/images/gallery/gallery5.jpg",
      alt: "Science exploration area with hands-on activities",
      title: "Science Exploration",
      description:
        "Hands-on science activities that spark curiosity and encourage critical thinking.",
    },
    {
      id: "6",
      src: "//images/gallery/gallery6.jpg",
      alt: "Music room with instruments and children singing",
      title: "Music & Movement",
      description:
        "Musical instruments and movement activities that enhance rhythm and coordination.",
    },
    {
      id: "7",
      src: "/images/gallery/gallery7.jpg",
      alt: "Cafeteria with children enjoying healthy meals",
      title: "Healthy Meals",
      description:
        "Nutritious meals prepared fresh daily to fuel growing minds and bodies.",
    },
    {
      id: "8",
      src: "/images/gallery/gallery8.jpg",
      alt: "Quiet nap room with comfortable sleeping areas",
      title: "Rest Time",
      description:
        "Comfortable and peaceful spaces for children to rest and recharge during the day.",
    },
  ];

  const highlights = [
    {
      icon: Camera,
      title: "Daily Photos",
      description:
        "We capture precious moments of your child's learning journey and share them with families.",
    },
    {
      icon: Heart,
      title: "Happy Faces",
      description:
        "See the joy and excitement on our students' faces as they discover new things every day.",
    },
    {
      icon: BookOpen,
      title: "Learning in Action",
      description:
        "Witness our educational programs in action through real classroom activities and projects.",
    },
    {
      icon: Users,
      title: "Community Events",
      description:
        "Special events, performances, and celebrations that bring our WonderMinds family together.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of Emma (Age 4)",
      content:
        "The photos and updates we receive daily show us how much Emma is learning and growing. It's wonderful to see her so happy and engaged!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Parent of Alex (Age 6)",
      content:
        "The gallery really shows the quality of the learning environment. Alex comes home every day excited to tell us about his adventures.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Parent of Sofia (Age 3)",
      content:
        "I love seeing Sofia's artwork and activities in the gallery. It gives me peace of mind knowing she's in such a nurturing environment.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Our Gallery
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Take a virtual tour of our facilities and see the happy faces of
                our students engaged in learning, playing, and growing together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Daily Updates
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Happy Moments
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learning in Action
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Community Events
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
      </section>

      {/* Gallery Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You'll See
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our gallery showcases the vibrant learning environment, happy
              children, and the daily activities that make WonderMinds special.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                      <highlight.icon className="h-8 w-8 text-violet-600" />
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {highlight.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <GalleryGrid
            images={galleryImages}
            title="Learning Spaces & Activities"
            description="Explore our facilities and see children engaged in various learning activities throughout the day."
            // showLightbox={true}
          />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Us in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch our video to get a better sense of the daily activities and
              learning environment at WonderMinds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Virtual Tour Video
                    </h3>
                    <p className="text-muted-foreground">
                      Click to watch our facility tour and see our programs in
                      action
                    </p>
                  </div>
                  <Button className="btn-primary">Watch Video</Button>
                </div>
                {/* Note: Replace with actual video when available */}
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-violet-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Hear from families who love seeing their children's daily
              adventures at WonderMinds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="h-full flex flex-col"
              >
                <Card className="h-full min-h-[300px] bg-white/10 backdrop-blur-sm border-white/20 text-white flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <CardDescription className="text-violet-100">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Smile className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-violet-200">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Ready to See More?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a visit to see our facilities in person and experience
              the WonderMinds difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="/contact">
                  Schedule a Visit
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
