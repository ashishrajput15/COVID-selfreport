/**
 * This function is used to get the address of the user
 */
export default (place) => {
  let address = '', street = '', state = '',
  district = '', city = '', pincode = '';

if (place.address_components) {
  place.address_components.forEach((component) => {
    if (component.types.indexOf('street_address') !== -1) {
      street = component.long_name;
    }

    if (component.types.indexOf('route') !== -1 && street === '') {
      street = component.long_name;
    }

    if (component.types.indexOf('administrative_area_level_1') !== -1) {
      state = component.long_name;
    }

    if (component.types.indexOf('administrative_area_level_2') !== -1) {
      district = component.long_name;
    }

    if (
      (component.types.indexOf('locality') !== -1) ||
      (component.types.indexOf('sublocality') !== -1) ||
      (component.types.indexOf('administrative_area_level_3') !== -1)
    ) {
      city = component.long_name;
    }

    if (component.types.indexOf('postal_code') !== -1) {
      pincode = component.short_name;
    }
  });
  }
  if (place.formatted_address) {
    address = place.formatted_address;
  }

  return {
    address,
    street,
    state,
    district,
    city,
    pincode,
  }
}
