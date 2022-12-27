export function LocationList({locations, onClick}) {
    return locations?.map((l, index) =>
        <div style={{overflow: "hidden", textOverflow: "ellipsis"}}
             className='ps-3 p-2'
             onClick={() => onClick(l)}
             key={index}>
            {l.matching_place_name ? l.matching_place_name + " (" + l.place_name + ")" : l.place_name}
        </div>);
}