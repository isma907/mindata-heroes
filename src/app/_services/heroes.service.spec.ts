import { TestBed } from '@angular/core/testing'
import { HeroesService } from "./heroes.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Hero } from '../_interfaces/hero.interface';

describe('HeroesService', () => {
    let service: HeroesService;
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        service = TestBed.inject(HeroesService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })


    it('should get heroes list', () => {
        const expectedResponse: Hero[] = [
            {
                "name": "Abin Sur",
                "_id": "65caacb24da4b1f6eae2e136",
                "firstAppearance": "Showcase #22 (October, 1959)",
                "publisher": "DC Comics",
                "imageUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/3-abin-sur.jpg"
            },
        ];

        service.getHeroesDB().subscribe((res) => {
            expect(res.length).toBe(expectedResponse.length);
            res.forEach((hero) => {
                expect(expectedResponse).toContain(jasmine.objectContaining(hero));
            });
        });

        const req = httpMock.expectOne("assets/superheroes.json");
        expect(req.request.method).toBe("GET");

        req.flush(expectedResponse);
    });

})