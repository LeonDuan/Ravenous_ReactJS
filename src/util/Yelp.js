const apiKey = '76Tf7uRP15oU07U-n8TsV0DscDlWJnxZped2qfhnjOPOMMsGqa9jGgQGJzW4Ubx2eRlGdE4c-NJtf-5VRL0Sl_2KeUUQzwPAM4-m_R0Fbn8jkpvufCblld1bxYhjWnYx';
const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    ).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: (business.location.address1 + " " + business.location.address2 + " " + business.location.address3).trim(),
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
        }));
      }
    });
  }
};

export default Yelp;
