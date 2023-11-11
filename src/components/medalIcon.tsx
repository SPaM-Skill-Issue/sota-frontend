interface MedalIconProp {
    place: 1 | 2 | 3,
    size: number,
    fill: string,
    className: string
}

const iconSvgPaths = [
    /* First Place */  "M295.168 89.664a42.688 42.688 0 1 0-78.272 33.984l101.632 234.24a334.016 334.016 0 0 0-137.216 271.424c0 181.504 142.208 330.688 320 330.688h21.376c177.792 0 320-149.12 320-330.688a334.016 334.016 0 0 0-137.216-271.424l101.696-234.24a42.688 42.688 0 0 0-78.272-33.92L629.888 317.568a309.76 309.76 0 0 0-88.384-18.432l76.16-175.552a42.688 42.688 0 1 0-78.208-33.92L512 152.832 484.608 89.6a42.688 42.688 0 0 0-78.272 33.984l59.136 136.32-18.816 43.52c-18.112 3.2-35.648 7.936-52.544 14.144L295.168 89.664z m200.768 472.128a32 32 0 1 1-53.184-35.584V526.08l0.192-0.192 0.384-0.576 1.28-1.92a230.528 230.528 0 0 1 20.608-25.024c6.272-6.592 14.72-14.4 24.32-20.16 8.896-5.248 25.088-12.48 43.456-6.784 8.96 2.752 16.704 8.192 22.4 16.192 4.992 7.168 7.104 14.72 8.128 20.288 1.856 9.6 1.792 21.44 1.792 31.872v185.6h32a32 32 0 1 1 0 64h-128a32 32 0 0 1 0-64h32V554.368l-1.088 1.408a158.72 158.72 0 0 0-3.328 4.48l-0.96 1.472z",
    /* Second Place */ "M295.168 89.664a42.688 42.688 0 1 0-78.272 33.984l101.632 234.24a334.016 334.016 0 0 0-137.216 271.424c0 181.504 142.208 330.688 320 330.688h21.376c177.792 0 320-149.12 320-330.688a334.016 334.016 0 0 0-137.216-271.424l101.696-234.24a42.688 42.688 0 0 0-78.272-33.92L629.888 317.568a309.76 309.76 0 0 0-88.384-18.432l76.16-175.552a42.688 42.688 0 1 0-78.208-33.92L512 152.832 484.608 89.6a42.688 42.688 0 0 0-78.272 33.984l59.136 136.32-18.816 43.52c-18.112 3.2-35.648 7.936-52.544 14.144L295.168 89.664z m151.872 401.92c14.848-12.8 33.088-17.984 50.304-17.984h28.48c17.216 0 35.456 5.184 50.304 17.984 15.104 12.992 24.32 31.872 26.624 54.592 1.28 12.224 1.28 26.048 0 38.272-1.856 18.368-12.8 34.56-19.712 43.52a169.088 169.088 0 0 1-17.088 19.008l-40.128 27.776a211.136 211.136 0 0 0-29.568 25.6c-10.688 11.328-17.088 21.44-19.456 29.248H575.168a27.712 27.712 0 1 1 0 55.424H485.888c-4.352 0-9.216 0.064-13.568-0.128a77.12 77.12 0 0 1-20.736-3.2 44.16 44.16 0 0 1-23.232-17.024 50.048 50.048 0 0 1-8.128-28.672c0-31.104 20.48-57.6 35.712-73.728a266.24 266.24 0 0 1 36.8-32l0.128-0.128 2.048-1.408 0.32-0.256 35.392-24.448a116.992 116.992 0 0 0 8.32-9.728c6.08-7.808 8.448-13.504 8.64-15.488a140.16 140.16 0 0 0 0-27.008c-1.088-10.752-4.8-15.744-7.68-18.176a21.248 21.248 0 0 0-14.08-4.608H497.28a21.248 21.248 0 0 0-14.08 4.608c-2.88 2.432-6.592 7.424-7.68 18.176a27.712 27.712 0 0 1-55.168-5.632c2.304-22.72 11.52-41.6 26.624-54.592z",
    /* Third Place */  "M295.168 89.664a42.688 42.688 0 1 0-78.272 33.984l101.632 234.24a334.016 334.016 0 0 0-137.216 271.424c0 181.504 142.208 330.688 320 330.688h21.376c177.792 0 320-149.12 320-330.688a334.016 334.016 0 0 0-137.216-271.424l101.696-234.24a42.688 42.688 0 0 0-78.272-33.92L629.888 317.568a309.76 309.76 0 0 0-88.384-18.432l76.16-175.552a42.688 42.688 0 1 0-78.208-33.92L512 152.832 484.608 89.6a42.688 42.688 0 0 0-78.272 33.984l59.136 136.32-18.816 43.52c-18.112 3.2-35.648 7.936-52.544 14.144L295.168 89.664z m151.872 401.92c14.848-12.8 33.088-17.984 50.304-17.984h28.48c17.216 0 35.456 5.184 50.304 17.984 15.104 12.992 24.32 31.872 26.624 54.592 1.28 12.224 1.28 26.048 0 38.272-1.6 16-7.68 32-17.28 44.864 9.6 12.864 15.68 28.8 17.28 44.864 1.28 12.224 1.28 26.048 0 38.272-2.304 22.72-11.52 41.6-26.624 54.592-14.848 12.8-33.088 17.984-50.304 17.984H497.28c-17.216 0-35.456-5.184-50.304-17.92-15.104-13.056-24.32-31.936-26.624-54.656a27.712 27.712 0 0 1 55.168-5.632c1.088 10.752 4.8 15.744 7.68 18.176 3.136 2.752 7.872 4.608 14.08 4.608h28.48c6.208 0 10.944-1.92 14.08-4.608 2.88-2.432 6.592-7.424 7.68-18.176a140.16 140.16 0 0 0 0-27.008 32.576 32.576 0 0 0-7.488-18.432c-3.456-3.84-6.272-4.352-7.168-4.352h-2.56a27.712 27.712 0 1 1 0-55.424h2.56c0.896 0 3.712-0.512 7.168-4.352a32.512 32.512 0 0 0 7.488-18.432 140.16 140.16 0 0 0 0-27.008c-1.088-10.752-4.8-15.744-7.68-18.176a21.248 21.248 0 0 0-14.08-4.608H497.28a21.248 21.248 0 0 0-14.08 4.608c-2.88 2.432-6.592 7.424-7.68 18.176a27.712 27.712 0 0 1-55.168-5.632c2.304-22.72 11.52-41.6 26.624-54.592z"
];

const MedalIcon: React.FC<Partial<MedalIconProp>> = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"
            width={props.size} height={props.size} className={props.className}>
                <path d={iconSvgPaths[props.place! - 1]} fill={props.fill} />
        </svg>
    );
};

MedalIcon.defaultProps = {
    size: 64,
    fill: "#FFF",
    className: ""
};

export default MedalIcon;