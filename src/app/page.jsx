import getServerTranslation from "@/i18n/getServerTranslation"





export default function(){
    return <>
        <h3 style={{width: "100%", height: "100vh"}} className="flex center">
            {
                getServerTranslation("welcome")
            }
        </h3>
    </>
}
