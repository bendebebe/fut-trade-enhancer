import { getValue, setValue } from "../../services/repository";
let eventMappers = new Set();

const clickHandler = (key, evt) => {
  const enhancerSetting = getValue("EnhancerSettings") || {};
  if (enhancerSetting[key]) {
    enhancerSetting[key] = false;
    jQuery(evt.currentTarget).removeClass("toggled");
  } else {
    enhancerSetting[key] = true;
    jQuery(evt.currentTarget).addClass("toggled");
  }
  setValue("EnhancerSettings", enhancerSetting);
};

export const generateToggleInput = (
  label,
  id,
  info,
  isToggled,
  additionalClasses = ""
) => {
  const key = Object.keys(id)[0];
  if (isToggled) {
    setTimeout(() => {
      jQuery(`#${id[key]}`).click();
    }, 400);
  }
  if (!eventMappers.has(key)) {
    jQuery(document).on("click touchend", `#${id[key]}`, (evt) => {
      clickHandler(key, evt);
    });
    eventMappers.add(key);
  }
  return `
    <div class="price-filter  ${additionalClasses}">
        <div class="ut-toggle-cell-view">
           <span class="ut-toggle-cell-view--label">${label} <br/><small>${info}</small></span>
             <div id='${id[key]}' class="ut-toggle-control">
               <div class="ut-toggle-control--track">
              </div>
              <div class= "ut-toggle-control--grip" >
          </div> 
           </div> 
       </div>
    </div> `;
};