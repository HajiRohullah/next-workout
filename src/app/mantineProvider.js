"use client";
import { MantineProvider } from '@mantine/core'
import React from 'react'


function RootStyleRegistry({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        loader: "bars",
        breakpoints: {
          xs: 300,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
        fontFamily: "unset",
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 1180,
                lg: 1180,
                xl: 1320,
              },
            },
          },
        },
        colors: {
          white: "#fff",
          primary: "#2BADE3",
          blue: [
            "#eaf7fc",
            "#bfe6f7",
            "#95d6f1",
            "#6bc6eb",
            "#2bade3",
            "#2bade3",
            "#279ccc",
            "#228ab6",
            "#1e799f",
            "#1a6888",
          ],
          oceanBlue: [
            "#7AD1DD",
            "#5FCCDB",
            "#44CADC",
            "#2AC9DE",
            "#1AC2D9",
            "#11B7CD",
            "#09ADC3",
            "#0E99AC",
            "#128797",
            "#147885",
          ],
          secondary: "#9e9e9e",
          keyGray: "#777777",
          grayCustom: "#5C5C5C",
          textGrey: "#A4A4A4",
          brandGrey: "#F8F8F8",
          brandGrey2: "#ECECEC",
          primaryOpacity: "rgba(43, 173, 227, 0.1)",
        },
        defaultGradient: { deg: 90, from: "#2BADE3", to: "#008CC6" },
        defaultRadius: 6,
        primaryColor: "blue",
      }}>
      {children}
    </MantineProvider>
  )
}

export default RootStyleRegistry