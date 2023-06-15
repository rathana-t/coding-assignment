export default function useCountry() {
    function getCallingCode(idd) {
      if(!idd) return "N/A";

        return `${idd?.root || ""}${idd?.suffixes?.[0] || ""}` || "N/A";
    }

    function getTheNativeName(nativeName) {
        for (const key in nativeName) {
          return nativeName[key]?.official;
        }
      
        return "N/A";
      }

    function getItemObject(item) {
        return Object.keys(item).map((key) => {
          return {
            key,
            value: Array.isArray(item[key]) ? item[key].join(", ") : item[key],
          };
        });
    }

    return { getCallingCode, getTheNativeName, getItemObject }
}