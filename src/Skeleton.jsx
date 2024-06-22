import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
    <ContentLoader 
        speed={2}
        width={800}
        height={160}
        viewBox="0 0 800 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="17" y="7" rx="0" ry="0" width="400" height="168" /> 
        <rect x="457" y="8" rx="0" ry="0" width="301" height="66" /> 
        <rect x="459" y="82" rx="0" ry="0" width="301" height="72" />
    </ContentLoader>
)

export default Skeleton