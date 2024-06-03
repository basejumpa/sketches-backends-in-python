# create_cylinder_glb.py
import trimesh

def create_cylinder():
    # Create a cylinder
    cylinder = trimesh.creation.cylinder(radius=0.25, height=2.0, sections=60)

    # Export the cylinder to a GLB file
    cylinder.export('../frontend_mockup/public/model.glb')

if __name__ == "__main__":
    create_cylinder()
