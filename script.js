// Fetch data from db.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    // Page 1
    document.getElementById('logo').innerText = data.page1.logo;
    document.getElementById('dogBreedsLink').href = data.page1.links[0].url;
    document.getElementById('adoptionProcessLink').href = data.page1.links[1].url;
    document.getElementById('testimonialsLink').href = data.page1.links[2].url;
    document.getElementById('joinUsLink').href = data.page1.links[3].url;
    document.getElementById('welcomeText').innerText = data.page1.text;

    // Page 2 - Dog Breeds
    const dogBreedsList = document.getElementById('dogBreedsList');
    data.page2.breeds.forEach(breed => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.innerText = breed.name;
      li.appendChild(a);
      dogBreedsList.appendChild(li);
    });

    // Page 3 - Testimonials
    const testimonialsList = document.getElementById('testimonialsList');
    data.page3.testimonials.forEach(testimonial => {
      const div = document.createElement('div');
      const names = document.createElement('p');
      const quote = document.createElement('p');
      const author = document.createElement('p');
      names.innerText = `${testimonial.name}`;
      quote.innerText = testimonial.quote;
      author.innerText = ` ${testimonial.location}`;
      div.appendChild(names);
      div.appendChild(quote);
      div.appendChild(author);
      testimonialsList.appendChild(div);
    });

    // Footer
    document.getElementById('footerLogo').innerText = data.page1.logo;
    document.getElementById('footerDogBreedsLink').href = data.page1.links[0].url;
    document.getElementById('footerAdoptionProcessLink').href = data.page1.links[1].url;
    document.getElementById('footerTestimonialsLink').href = data.page1.links[2].url;
    document.getElementById('footerJoinUsLink').href = data.page1.links[3].url;
  })
  .catch(error => {
    console.log('An error occurred while fetching data:', error);
  });

// Example: PATCH request to update the available count of a breed
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const breedToUpdate = data.page2.breeds.find(breed => breed.name === 'Rottweiler');
    if (breedToUpdate) {
      breedToUpdate.available = 5;

      fetch('db.json', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('Breed updated successfully.');
          } else {
            console.log('Failed to update breed.');
          }
        })
        .catch(error => {
          console.log('An error occurred while updating the breed:', error);
        });
    } else {
      console.log('Breed not found.');
    }
  })
  .catch(error => {
    console.log('An error occurred while fetching data:', error);
  });

// Example: POST request to add a new testimonial
const newTestimonial = {
  name: 'John',
  location: 'Paris, France',
  quote: 'I adopted a Labrador Retriever and it has been an amazing experience.'
};

fetch('db.json')
  .then(response => response.json())
  .then(data => {
    data.page3.testimonials.push(newTestimonial);

    fetch('db.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          console.log('New testimonial added successfully.');
        } else {
          console.log('Failed to add new testimonial.');
        }
      })
      .catch(error => {
        console.log('An error occurred while adding new testimonial:', error);
      });
  })
  .catch(error => {
    console.log('An error occurred while fetching data:', error);
  });

// Example: DELETE request to remove a testimonial
const testimonialToRemove = {
  name: 'Jane',
  location: 'New York City, USA',
  quote: 'Paws for Hope provided a life-changing experience to me. Fluffy Max brought joy and happiness daily. I highly recommend Paws for Hope to anyone looking to adopt a dog and plans to return for future adoptions.'
};

fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const index = data.page3.testimonials.findIndex(testimonial => {
      return (
        testimonial.name === testimonialToRemove.name &&
        testimonial.location === testimonialToRemove.location &&
        testimonial.quote === testimonialToRemove.quote
      );
    });

    if (index !== -1) {
      data.page3.testimonials.splice(index, 1);

      fetch('db.json', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('Testimonial removed successfully.');
          } else {
            console.log('Failed to remove testimonial.');
          }
        })
        .catch(error => {
          console.log('An error occurred while removing testimonial:', error);
        });
    } else {
      console.log('Testimonial not found.');
    }
  })
  .catch(error => {
    console.log('An error occurred while fetching data:', error);
  });